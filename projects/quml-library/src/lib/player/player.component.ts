import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef,  HostListener } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { QumlLibraryService } from '../quml-library.service';
import { QumlPlayerConfig } from '../quml-library-interface';
import { UserService } from '../user-service';
import { eventName, TelemetryType, pageId } from '../telemetry-constants';



@Component({
  selector: 'quml-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit , AfterViewInit {
  @Input() questions: any;
  @Input() QumlPlayerConfig: QumlPlayerConfig;
  @Input() linearNavigation: boolean;
  @Input() duration: any;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();
  @Output() previousClicked = new EventEmitter<any>();
  @Output() nextClicked = new EventEmitter<any>();
  @Output() questionClicked = new EventEmitter<any>();
  @ViewChild('car') car: CarouselComponent;

  scoreBoard = [];
  endPageReached: boolean;
  slides: any;
  slideInterval: number;
  showIndicator: Boolean;
  noWrapSlides: Boolean;
  optionSelectedObj: any;
  showAlert: Boolean;
  currentOptions: any;
  currentQuestion: any;
  currentSolutions: any;
  showSolution: any;
  active = false;
  alertType: boolean;
  previousOption: any;
  scoreBoardObject = {};
  timeLimit: any;
  showTimer: any;
  showFeedBack: boolean;
  showUserSolution: boolean;
  startPageInstruction: string;
  shuffleQuestions: boolean;
  requiresSubmit: boolean;
  noOfQuestions: number;
  maxScore: number;
  initialTime: number;
  initializeTimer: boolean;
  durationSpent: string;
  userName: string;
  contentName: string;
  currentSlideIndex = 0;
  attemptedQuestions = [];
  loadScoreBoard = false;
  // need to see
  loadingScreen = true;
  CarouselConfig = {
    NEXT: 1,
    PREV: 2
  };

  constructor(
    public qumlLibraryService: QumlLibraryService,
    public userService: UserService
  ) {
    this.endPageReached = false;
    this.userService.qumlPlayerEvent.asObservable().subscribe((res) => {
        this.playerEvent.emit(res);
    });
  }

  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit() {
    this.qumlLibraryService.initializeTelemetry(this.QumlPlayerConfig);
    this.userService.initialize(this.QumlPlayerConfig);
    this.initialTime = new Date().getTime();
    this.slideInterval = 0;
    this.showIndicator = false;
    this.noWrapSlides = true;
    this.questions = this.QumlPlayerConfig.data.result.content.children;
    this.timeLimit = this.QumlPlayerConfig.data.result.content.timeLimit;
    this.showTimer = this.QumlPlayerConfig.data.result.content.showTimer;
    this.showFeedBack = this.QumlPlayerConfig.data.result.content.showFeedback;
    this.showUserSolution = this.QumlPlayerConfig.data.result.content.showSolutions;
    this.startPageInstruction = this.QumlPlayerConfig.data.result.content.instructions;
    this.linearNavigation = this.QumlPlayerConfig.data.result.content.navigationMode === 'non-linear' ? false : true;
    this.requiresSubmit = this.QumlPlayerConfig.data.result.content.requiresSubmit;
    this.noOfQuestions = this.QumlPlayerConfig.data.result.content.totalQuestions;
    this.maxScore = this.QumlPlayerConfig.data.result.content.maxScore;
    this.userName = this.QumlPlayerConfig.context.userData.firstName + ' ' + this.QumlPlayerConfig.context.userData.lastName;
    this.contentName = this.QumlPlayerConfig.data.result.content.name;

    if (this.QumlPlayerConfig.data.result.content.shuffle) {
      this.questions = this.QumlPlayerConfig.data.result.content.children.sort(() => Math.random() - 0.5);
    }
    this.userService.raiseStartEvent(this.car.getCurrentSlideIndex());
  }

  ngAfterViewInit() {
    this.userService.raiseHeartBeatEvent(eventName.startPageLoaded, TelemetryType.impression , pageId.startPage);
  }

  nextSlide() {
    this.userService.raiseHeartBeatEvent(eventName.nextClicked , TelemetryType.interact, this.currentSlideIndex);
    if (this.currentSlideIndex !== this.questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }
    if (this.currentSlideIndex === 1 && (this.currentSlideIndex - 1) === 0) {
        this.initializeTimer = true;
    }
    if (this.car.getCurrentSlideIndex()  === this.questions.length) {
        if (!this.requiresSubmit) {
        this.endPageReached = true;
        const spentTime = (new Date().getTime() - this.initialTime) / 10000;
        this.durationSpent = spentTime.toFixed(2);
        this.userService.raiseEndEvent(this.currentSlideIndex , this.attemptedQuestions.length , this.endPageReached);
        } else {
          this.scoreBoard.splice(0, 1);
          this.loadScoreBoard = true;
        }
    }
    this.car.move(this.CarouselConfig.NEXT);
    this.active = false;
    this.showAlert = false;
    this.optionSelectedObj = undefined;
    if (!this.attemptedQuestions.includes(this.car.getCurrentSlideIndex())) {
      this.attemptedQuestions.push(this.car.getCurrentSlideIndex());
    }
  }


  getOptionSelected(optionSelected) {
    this.userService.raiseHeartBeatEvent(eventName.optionClicked , TelemetryType.interact , pageId.startPage);
    this.optionSelectedObj = optionSelected;
    this.currentSolutions = optionSelected.solutions;
    this.active = true;
  }

  closeAlertBox(event) {
    if (event.type === 'close') {
    this.userService.raiseHeartBeatEvent(eventName.closedFeedBack , TelemetryType.interact, this.car.getCurrentSlideIndex());
    } else if (event.type === 'tryAgain') {
    this.userService.raiseHeartBeatEvent(eventName.tryAgain , TelemetryType.interact, this.car.getCurrentSlideIndex());
    }
    this.showAlert = false;
  }

  viewSolution() {
    this.userService.raiseHeartBeatEvent(eventName.viewSolutionClicked , TelemetryType.interact, this.car.getCurrentSlideIndex());
    this.showSolution = true;
    this.showAlert = false;
  }

  exitContent(event) {
    if (event.type === 'EXIT') {
      this.userService.raiseEndEvent(this.currentSlideIndex , this.currentSlideIndex - 1, this.endPageReached);
    }
  }

  closeSolution() {
    this.userService.raiseHeartBeatEvent(eventName.solutionClosed , TelemetryType.interact, this.car.getCurrentSlideIndex());
    this.showSolution = false;
    this.car.selectSlide(this.currentSlideIndex);
  }

  async validateSelectedOption(option) {
    this.scoreBoardObject = {};
    let updated = false;
    if (this.optionSelectedObj !== undefined) {
      const currentIndex = this.car.getCurrentSlideIndex() - 1;
      this.currentQuestion = this.questions[currentIndex].body;
      this.currentOptions = this.questions[currentIndex].interactions.response1.options;
      const correctOptionValue = this.questions[currentIndex].responseDeclaration.response1.correct_response.value;
      this.currentOptions.forEach((ele, index) => {
        if (ele.body === option.option.body && ele.value === correctOptionValue) {
          this.scoreBoardObject['index'] = this.car.getCurrentSlideIndex();
          this.scoreBoardObject['status'] = true;
          this.scoreBoardObject['class'] = 'correct';
          this.showAlert = true;
          this.alertType = true;
        } else if (index === (this.currentOptions.length - 1) && !Object.keys(this.scoreBoardObject).length) {
          this.scoreBoardObject['index'] = this.car.getCurrentSlideIndex();
          this.scoreBoardObject['status'] = false;
          this.scoreBoardObject['class'] = 'wrong';
          this.showAlert = true;
          this.alertType = false;
        }
      });
      this.optionSelectedObj = undefined;
    } else if (this.optionSelectedObj === undefined && !this.active) {
      this.scoreBoardObject['index'] = this.car.getCurrentSlideIndex();
      this.scoreBoardObject['status'] = false;
      this.scoreBoardObject['class'] = 'skipped';
      this.nextSlide();
    } else if (this.optionSelectedObj === undefined && this.active) {
      this.nextSlide();
    }
    this.scoreBoard.forEach((ele) => {
      if (ele.index === this.scoreBoardObject['index']) {
        ele['status'] = this.scoreBoardObject['status'];
        ele['class'] = this.scoreBoardObject['class'];
        updated = true;
      }
    });
    if (!updated && Object.keys(this.scoreBoardObject).length > 0) {
      this.scoreBoard.push(this.scoreBoardObject);
    }
  }

  prevSlide() {
    this.userService.raiseHeartBeatEvent(eventName.prevClicked , TelemetryType.interact, this.car.getCurrentSlideIndex());
    this.showAlert = false;
    if (this.loadScoreBoard) {
      const index = this.questions.length - 1;
      this.car.selectSlide(index);
      this.loadScoreBoard = false;
    }
    if (this.attemptedQuestions.includes(this.currentSlideIndex)) {
      const index = this.attemptedQuestions.indexOf(this.car.getCurrentSlideIndex());
      this.attemptedQuestions.splice(index, 1);
    } else if (this.car.getCurrentSlideIndex() === 0) {
      this.attemptedQuestions = [];
    }
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex = this.currentSlideIndex - 1;
    }
    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length && this.endPageReached) {
      this.endPageReached = false;
    } else if (!this.linearNavigation) {
      this.car.move(this.CarouselConfig.PREV);
    }
    if (!this.attemptedQuestions.includes(this.car.getCurrentSlideIndex())) {
      this.attemptedQuestions.push(this.car.getCurrentSlideIndex());
    }
  }

  nextSlideClicked(event) {
    if (event.type === 'next') {
      this.validateSelectedOption(this.optionSelectedObj);
    }
  }

  previousSlideClicked(event) {
    if (event = 'previous clicked') {
      this.prevSlide();
    }
  }
  replayContent() {
    this.userService.raiseHeartBeatEvent(eventName.replayClicked , TelemetryType.interact, this.car.getCurrentSlideIndex());
    this.userService.raiseStartEvent(this.car.getCurrentSlideIndex());
    this.endPageReached = false;
    this.currentSlideIndex = 0;
    this.attemptedQuestions = [];
    this.car.selectSlide(0);
  }

  inScoreBoardSubmitClicked() {
    this.userService.raiseHeartBeatEvent(eventName.scoreBoardSubmitClicked , TelemetryType.interact , pageId.submitPage);
    this.endPageReached = true;
  }

  goToSlide(index) {
    this.currentSlideIndex = index;
    this.car.selectSlide(index);
  }

}

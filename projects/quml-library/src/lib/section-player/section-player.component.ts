import * as _ from 'lodash-es';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ErrorService, errorCode, errorMessage } from '@project-sunbird/sunbird-player-sdk-v9';
import { IAttempts, IParentConfig, QumlPlayerConfig } from '../quml-library-interface';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { TelemetryType, eventName, pageId } from '../telemetry-constants';

import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { ISideBarEvent } from '@project-sunbird/sunbird-player-sdk-v9/sunbird-player-sdk.interface';
import { Player } from '../player/src/Player';
import { QuestionCursor } from '../quml-question-cursor.service';
import { UtilService } from '../util-service';
import { ViewerService } from '../services/viewer-service/viewer-service';
import maintain from 'ally.js/esm/maintain/_maintain';
import { takeUntil } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'quml-section-player',
  templateUrl: './section-player.component.html',
  styleUrls: ['./section-player.component.scss', './../startpage/sb-ckeditor-styles.scss']
})
export class SectionPlayerComponent implements OnChanges, AfterViewInit {

  @Input() sectionConfig: QumlPlayerConfig;
  @Input() attempts: IAttempts;
  @Input() jumpToQuestion;
  @Input() mainProgressBar;
  @Input() sectionIndex = 0;
  @Input() parentConfig: IParentConfig;
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();
  @Output() sectionEnd = new EventEmitter<any>();
  @Output() score = new EventEmitter<any>();
  @Output() summary = new EventEmitter<any>();
  @Output() showScoreBoard = new EventEmitter<any>();

  @ViewChild('myCarousel', { static: false }) myCarousel: CarouselComponent;
  @ViewChild('imageModal', { static: true }) imageModal: ElementRef;
  @ViewChild('questionSlide', { static: false }) questionSlide: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  loadView = false;
  showContentError = false;
  noOfTimesApiCalled = 0;
  currentSlideIndex = 0;
  showStartPage = true;
  threshold: number;
  noOfQuestions: number;
  timeLimit: any;
  warningTime: string;
  showTimer: any;
  showFeedBack: boolean;
  showUserSolution: boolean;
  startPageInstruction: string;
  points: number;
  linearNavigation: boolean;
  showHints: any;
  allowSkip: boolean;
  disableNext: boolean;
  tryAgainClicked = false;
  carouselConfig = {
    NEXT: 1,
    PREV: 2
  };
  active = false;
  showAlert: boolean;
  currentOptions: any;
  currentSolutions: any;
  showSolution: any;
  intervalRef: any;
  infoPopup: boolean;
  stopAutoNavigation: boolean;
  showQuestions = false;
  showZoomModal = false;
  zoomImgSrc: string;
  imageZoomCount = 100;
  showRootInstruction = true;
  slideDuration = 0;
  disabledHandle: any;
  subscription: Subscription;
  player: Player;
  constructor(
    public viewerService: ViewerService,
    public utilService: UtilService,
    public questionCursor: QuestionCursor,
    private cdRef: ChangeDetectorRef,
    public errorService: ErrorService,
    private playerService: PlayerService
  ) {
    this.player = this.playerService.getPlayerInstance();
  }

  ngOnChanges(changes): void {
    this.subscribeToEvents();
    this.setConfig();
  }

  ngAfterViewInit() {
    this.viewerService.raiseStartEvent(0);
    this.viewerService.raiseHeartBeatEvent(eventName.startPageLoaded, 'impression', 0);
  }

  private subscribeToEvents(): void {
    this.viewerService.qumlPlayerEvent.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.playerEvent.emit(res);
      });

    this.viewerService.qumlQuestionEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {

        if (res?.error) {
          const { traceId } = this.sectionConfig?.config;
          if (navigator.onLine && this.viewerService.isAvailableLocally) {
            this.viewerService.raiseExceptionLog(errorCode.contentLoadFails, errorMessage.contentLoadFails,
              new Error(errorMessage.contentLoadFails), traceId);
          } else {
            this.viewerService.raiseExceptionLog(errorCode.internetConnectivity, errorMessage.internetConnectivity,
              new Error(errorMessage.internetConnectivity), traceId);
          }
          this.showContentError = true;
          return;
        }

        if (!res?.questions) {
          return;
        }
        const unCommonQuestions = _.xorBy(this.player.getRendererState().questions, res.questions, 'identifier');
        const questions = _.uniqBy(this.player.getRendererState().questions.concat(unCommonQuestions), 'identifier');
        this.player.setRendererState({ singleParam: { paramName: "questions", paramData: questions } });
        this.player.sortQuestions();
        this.viewerService.updateSectionQuestions(this.sectionConfig.metadata.identifier, this.player.getRendererState().questions);
        this.cdRef.detectChanges();
        this.noOfTimesApiCalled++;
        this.loadView = true;
        if (this.currentSlideIndex > 0 && this.myCarousel) {
          this.myCarousel.selectSlide(this.currentSlideIndex);
          if (this.player.getRendererState().questions[this.currentSlideIndex - 1]) {
            this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[this.currentSlideIndex - 1]?.media } });
            this.setImageZoom();
            this.highlightQuestion();
          }
        }

        if (this.currentSlideIndex === 0) {
          if (this.showStartPage) {
            this.active = this.sectionIndex === 0;
          } else {
            setTimeout(() => { this.nextSlide(); });
          }
        }
        this.removeAttribute();
      });
  }

  private setConfig() {
    this.noOfTimesApiCalled = 0;
    this.currentSlideIndex = 0;
    this.active = this.currentSlideIndex === 0 && this.sectionIndex === 0 && this.showStartPage;

    if (this.myCarousel) {
      this.myCarousel.selectSlide(this.currentSlideIndex);
    }
    this.threshold = this.sectionConfig.context?.threshold || 3;
    this.player.setRendererState({ singleParam: { paramName: "questionIds", paramData: _.cloneDeep(this.sectionConfig.metadata.childNodes) } });

    if (this.parentConfig.isReplayed) {
      this.player.setRendererState({ singleParam: { paramName: "initializeTimer", paramData: true } });
      this.viewerService.raiseStartEvent(0);
      this.viewerService.raiseHeartBeatEvent(eventName.startPageLoaded, 'impression', 0);
      this.disableNext = false;
      this.currentSlideIndex = 0;
      this.myCarousel.selectSlide(0);
      this.showRootInstruction = true;
      this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[0]?.media } });
      this.setImageZoom();
      this.loadView = true;
      this.removeAttribute();

      setTimeout(() => {
        const menuBtn = document.querySelector('#overlay-button') as HTMLElement;
        if (menuBtn) {
          menuBtn.focus();
        }
      }, 200);
    }

    const maxQuestions = this.sectionConfig.metadata.maxQuestions;
    if (maxQuestions) {
      this.player.setRendererState({ singleParam: { paramName: "questionIds", paramData: this.player.getRendererState().questionIds.slice(0, maxQuestions) } });
    }

    this.noOfQuestions = this.player.getRendererState().questionIds.length;
    this.viewerService.initialize(this.sectionConfig, this.threshold, this.player.getRendererState().questionIds, this.parentConfig);
    this.checkCompatibilityLevel(this.sectionConfig.metadata.compatibilityLevel);

    this.timeLimit = this.sectionConfig.metadata?.timeLimits?.maxTime || 0;
    this.warningTime = this.sectionConfig.metadata?.timeLimits?.warningTime || 0;
    this.showTimer = this.sectionConfig.metadata?.showTimer?.toLowerCase() !== 'no';
    this.showFeedBack = this.sectionConfig.metadata?.showFeedback?.toLowerCase() !== 'no';
    this.showUserSolution = this.sectionConfig.metadata?.showSolutions?.toLowerCase() !== 'no';
    this.startPageInstruction = this.sectionConfig.metadata?.instructions?.default || this.parentConfig.instructions;
    this.linearNavigation = this.sectionConfig.metadata.navigationMode === 'non-linear' ? false : true;
    this.showHints = this.sectionConfig.metadata?.showHints?.toLowerCase() !== 'no';
    this.points = this.sectionConfig.metadata?.points;
    this.allowSkip = this.sectionConfig.metadata?.allowSkip?.toLowerCase() !== 'no';
    this.showStartPage = this.sectionConfig.metadata?.showStartPage?.toLowerCase() !== 'no';
    const x = this.parentConfig.isSectionsAvailable ? this.mainProgressBar.find(item => item.isActive)?.children :
      this.mainProgressBar
    this.player.setRendererState({ singleParam: { paramName: "progressBarClass", paramData: x } });
    const questions = this.viewerService.getSectionQuestions(this.sectionConfig.metadata.identifier);
    this.player.setRendererState({ singleParam: { paramName: "questions", paramData: questions } });
    this.player.sortQuestions();
    this.viewerService.updateSectionQuestions(this.sectionConfig.metadata.identifier, questions);
    this.resetQuestionState();
    if (this.jumpToQuestion) {
      this.goToQuestion(this.jumpToQuestion);
    } else if (this.threshold === 1) {
      this.viewerService.getQuestion();
    } else if (this.threshold > 1) {
      this.viewerService.getQuestions();
    }

    if (!this.sectionConfig.metadata?.children?.length) {
      this.loadView = true;
      this.disableNext = true;
    }

    if (!this.player.getRendererState().initializeTimer) {
      this.player.setRendererState({ singleParam: { paramName: "initializeTimer", paramData: true } });
    }
    this.player.setRendererState({ singleParam: { paramName: "initialSlideDuration", paramData: new Date().getTime() } });
  }

  removeAttribute() {
    setTimeout(() => {
      const firstSlide = document.querySelector('.carousel.slide') as HTMLElement;
      if (firstSlide) {
        firstSlide.removeAttribute("tabindex");
      }
    }, 100);
  }

  nextSlide() {
    this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[this.currentSlideIndex]?.media } });
    this.getQuestion();
    this.viewerService.raiseHeartBeatEvent(eventName.nextClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex() + 1);
    this.viewerService.raiseHeartBeatEvent(eventName.nextClicked, TelemetryType.impression, this.myCarousel.getCurrentSlideIndex() + 1);

    if (this.currentSlideIndex !== this.player.getRendererState().questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }


    if (this.myCarousel.getCurrentSlideIndex() === this.noOfQuestions) {
      this.emitSectionEnd();
      return;
    }

    if (this.myCarousel.isLast(this.myCarousel.getCurrentSlideIndex()) || this.noOfQuestions === this.myCarousel.getCurrentSlideIndex()) {
      this.player.calculateSectionScore();
    }

    const { currentOptionSelected } = this.player.getRendererState();
    if (this.myCarousel.getCurrentSlideIndex() > 0 &&
      this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1].qType === 'MCQ' && currentOptionSelected) {
      const option = currentOptionSelected && currentOptionSelected['option'] ? currentOptionSelected['option'] : undefined;
      const identifier = this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1].identifier;
      const qType = this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1].qType;
      this.viewerService.raiseResponseEvent(identifier, qType, option);
    }

    if (this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex()]) {
      this.player.setSkippedClass(this.myCarousel.getCurrentSlideIndex());
    }
    this.myCarousel.move(this.carouselConfig.NEXT);
    this.setImageZoom();
    this.resetQuestionState();
    this.clearTimeInterval();
  }

  prevSlide() {
    this.disableNext = false;
    this.currentSolutions = undefined;
    this.viewerService.raiseHeartBeatEvent(eventName.prevClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex() - 1);
    this.showAlert = false;

    if (this.currentSlideIndex !== this.player.getRendererState().questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }

    this.myCarousel.move(this.carouselConfig.PREV);
    this.currentSlideIndex = this.myCarousel.getCurrentSlideIndex();
    this.active = this.currentSlideIndex === 0 && this.sectionIndex === 0 && this.showStartPage;
    this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1]?.media } });

    this.setImageZoom();
    this.player.setSkippedClass(this.myCarousel.getCurrentSlideIndex() - 1);
  }

  getQuestion() {
    if (this.myCarousel.getCurrentSlideIndex() > 0
      && ((this.threshold * this.noOfTimesApiCalled) - 1) === this.myCarousel.getCurrentSlideIndex()
      && this.threshold * this.noOfTimesApiCalled >= this.player.getRendererState().questions.length && this.threshold > 1) {
      this.viewerService.getQuestions();
    }

    if (this.myCarousel.getCurrentSlideIndex() > 0
      && this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex()] === undefined && this.threshold > 1) {
      this.viewerService.getQuestions();
    }

    if (this.threshold === 1 && this.myCarousel.getCurrentSlideIndex() >= 0) {
      this.viewerService.getQuestion();
    }
  }

  resetQuestionState() {
    this.active = false;
    this.showAlert = false;
    this.player.setRendererState({ singleParam: { paramName: "selectedOption", paramData: undefined } });
    this.player.setRendererState({ singleParam: { paramName: "currentOptionSelected", paramData: undefined } });
    this.player.setRendererState({ singleParam: { paramName: "currentQuestion", paramData: undefined } });
    this.currentOptions = undefined;
    this.currentSolutions = undefined;
  }

  activeSlideChange(event) {
    this.player.setRendererState({ singleParam: { paramName: "initialSlideDuration", paramData: new Date().getTime() } });
    const element = document.querySelector('li.progressBar-border');
    if (element && !this.parentConfig.isReplayed) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextSlideClicked(event) {
    if (this.showRootInstruction && this.parentConfig.isSectionsAvailable) {
      this.showRootInstruction = false;
      return;
    }
    if (this.myCarousel.getCurrentSlideIndex() === 0) {
      return this.nextSlide();
    }
    if (event?.type === 'next') {
      this.validateSelectedOption(this.player.getRendererState().selectedOption, 'next');
    }
  }

  previousSlideClicked(event) {
    if (event.event === 'previous clicked') {
      const selectedOption = this.player.getRendererState().selectedOption;
      if (selectedOption && this.showFeedBack) {
        this.stopAutoNavigation = false;
        this.validateSelectedOption(selectedOption, 'previous');
      } else {
        this.stopAutoNavigation = true;
        if (this.currentSlideIndex === 0 && this.parentConfig.isSectionsAvailable && this.getCurrentSectionIndex() > 0) {
          const previousSectionId = this.mainProgressBar[this.getCurrentSectionIndex() - 1].identifier;
          this.jumpToSection(previousSectionId);
          return;
        }
        this.prevSlide();
      }
    }
  }

  getCurrentSectionIndex(): number {
    const currentSectionId = this.sectionConfig.metadata.identifier;
    return this.mainProgressBar.findIndex(section => section.identifier === currentSectionId);
  }

  goToSlideClicked(event, index) {
    if (!this.player.getRendererState().progressBarClass) {
      if (index === 0) {
        this.player.setRendererState({ singleParam: { paramName: 'jumpSlideIndex', paramData: 0 } });
        this.goToSlide(this.player.getRendererState().jumpSlideIndex);
      }
      return;
    }
    event.stopPropagation();
    this.active = false;
    this.player.getRendererState().jumpSlideIndex = index;
    const selectedOption = this.player.getRendererState().selectedOption;
    if (selectedOption && this.showFeedBack) {
      this.stopAutoNavigation = false;
      this.validateSelectedOption(selectedOption, 'jump');
    } else {
      this.stopAutoNavigation = true;
      this.goToSlide(this.player.getRendererState().jumpSlideIndex);
    }
  }

  onEnter(event, index) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.goToSlideClicked(event, index);
    }
  }

  jumpToSection(identifier: string) {
    this.showRootInstruction = false;
    this.emitSectionEnd(false, identifier);
  }

  onSectionEnter(event, identifier: string) {
    if (event.keyCode === 13) {
      const selectedOption = this.player.getRendererState().selectedOption;
      event.stopPropagation();
      if (selectedOption) {
        this.validateSelectedOption(selectedOption, 'jump');
      }
      this.jumpToSection(identifier);
    }
  }

  onScoreBoardClicked() {
    this.viewerService.updateSectionQuestions(this.sectionConfig.metadata.identifier, this.player.getRendererState().questions);
    this.showScoreBoard.emit();
  }

  onScoreBoardEnter(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key === 'Enter') {
      this.onScoreBoardClicked();
    }
  }

  focusOnNextButton() {
    setTimeout(() => {
      const nextBtn = document.querySelector('.quml-navigation__next') as HTMLElement;
      if (nextBtn) {
        nextBtn.focus();
      }
    }, 100);
  }

  getOptionSelected(optionSelected) {
    this.focusOnNextButton();
    this.active = true;
    this.player.setRendererState({ singleParam: { paramName: "currentOptionSelected", paramData: optionSelected } });
    const currentIndex = this.myCarousel.getCurrentSlideIndex() - 1;
    this.viewerService.raiseHeartBeatEvent(eventName.optionClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());

    // This optionSelected comes empty whenever the try again is clicked on feedback popup
    if (_.isEmpty(optionSelected?.option)) {
      this.player.setRendererState({ singleParam: { paramName: "selectedOption", paramData: undefined } });
      this.currentSolutions = undefined;
      this.player.updateScoreBoard(this.showFeedBack, currentIndex, 'skipped');
    } else {
      this.player.setRendererState({ singleParam: { paramName: "selectedOption", paramData: optionSelected } });
      this.currentSolutions = !_.isEmpty(optionSelected.solutions) ? optionSelected.solutions : undefined;
    }
    const media = this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1].media;

    if (this.currentSolutions) {
      this.currentSolutions.forEach((ele, index) => {
        if (ele.type === 'video') {
          media.forEach((e) => {
            if (e.id === this.currentSolutions[index].value) {
              this.currentSolutions[index].type = 'video';
              this.currentSolutions[index].src = e.src;
              this.currentSolutions[index].thumbnail = e.thumbnail;
            }
          });
        }
      });
    }
    if (!this.showFeedBack) {
      this.validateSelectedOption(this.player.getRendererState().selectedOption);
    }
  }

  durationEnds() {
    this.showSolution = false;
    this.showAlert = false;
    this.emitSectionEnd(true);
  }

  private checkCompatibilityLevel(compatibilityLevel) {
    if (compatibilityLevel) {
      const checkContentCompatible = this.errorService.checkContentCompatibility(compatibilityLevel);

      if (!checkContentCompatible.isCompitable) {
        this.viewerService.raiseExceptionLog(errorCode.contentCompatibility, errorMessage.contentCompatibility,
          checkContentCompatible.error, this.sectionConfig?.config?.traceId);
      }
    }
  }

  emitSectionEnd(isDurationEnded: boolean = false, jumpToSection?: string) {
    console.log("getRendererState", this.player.getRendererState());
    const eventObj: any = {
      summary: this.player.getSectionSummary(),
      score: this.player.calculateSectionScore(),
      slideIndex: this.myCarousel.getCurrentSlideIndex(),
      isDurationEnded,
    };
    if (jumpToSection) {
      eventObj.jumpToSection = jumpToSection;
    }
    this.viewerService.updateSectionQuestions(this.sectionConfig.metadata.identifier, this.player.getRendererState().questions);
    this.sectionEnd.emit(eventObj);
  }

  closeAlertBox(event) {
    if (event?.type === 'close') {
      this.viewerService.raiseHeartBeatEvent(eventName.closedFeedBack, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    } else if (event?.type === 'tryAgain') {
      this.tryAgainClicked = true;
      setTimeout(() => {
        this.tryAgainClicked = false;
      }, 2000);
      this.viewerService.raiseHeartBeatEvent(eventName.tryAgain, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    }
    this.showAlert = false;
  }

  sideBarEvents(event: ISideBarEvent) {
    if (event.type === 'OPEN_MENU' || event.type === 'CLOSE_MENU') {
      this.handleSideBarAccessibility(event);
    }
    this.viewerService.raiseHeartBeatEvent(event.type, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex() + 1);
  }

  handleSideBarAccessibility(event) {
    const navBlock = document.querySelector('.navBlock') as HTMLInputElement;
    const overlayInput = document.querySelector('#overlay-input') as HTMLElement;
    const overlayButton = document.querySelector('#overlay-button') as HTMLElement;
    const sideBarList = document.querySelector('#sidebar-list') as HTMLElement;

    if (event.type === 'OPEN_MENU') {
      const isMobile = this.sectionConfig.config?.sideMenu?.showExit;
      this.disabledHandle = isMobile ? maintain.hidden({ filter: [sideBarList, overlayButton, overlayInput] }) : maintain.tabFocus({ context: navBlock });
      this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
        if (e['key'] === 'Escape') {
          const inputChecked = document.getElementById('overlay-input') as HTMLInputElement;
          inputChecked.checked = false;
          document.getElementById('playerSideMenu').style.visibility = 'hidden';
          document.querySelector<HTMLElement>('.navBlock').style.marginLeft = '-100%';
          this.viewerService.raiseHeartBeatEvent('CLOSE_MENU', TelemetryType.interact, this.myCarousel.getCurrentSlideIndex() + 1);
          this.disabledHandle.disengage();
          this.subscription.unsubscribe();
          this.disabledHandle = null;
          this.subscription = null;
        }
      });
    } else if (event.type === 'CLOSE_MENU' && this.disabledHandle) {
      this.disabledHandle.disengage();
      this.disabledHandle = null;
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
  }

  validateSelectedOption(option, type?: string) {
    const selectedOptionValue = option?.option?.value;
    const selectedOption = this.player.getRendererState().selectedOption;
    const currentIndex = this.myCarousel.getCurrentSlideIndex() - 1;
    const isQuestionSkipAllowed = !selectedOption &&
      this.allowSkip && this.utilService.getQuestionType(this.player.getRendererState().questions, currentIndex) === 'MCQ';
    const isSubjectiveQuestion = this.utilService.getQuestionType(this.player.getRendererState().questions, currentIndex) === 'SA';
    const onStartPage = this.startPageInstruction && this.myCarousel.getCurrentSlideIndex() === 0;
    const isActive = !selectedOption && this.active;
    const selectedQuestion = this.player.getRendererState().questions[currentIndex];
    const key = selectedQuestion.responseDeclaration ? this.utilService.getKeyValue(Object.keys(selectedQuestion.responseDeclaration)) : '';
    this.slideDuration = Math.round((new Date().getTime() - this.player.getRendererState().initialSlideDuration) / 1000);
    const getParams = () => {
      if (selectedQuestion.qType.toUpperCase() === 'MCQ' && selectedQuestion?.editorState?.options) {
        return selectedQuestion.editorState.options;
      } else if (selectedQuestion.qType.toUpperCase() === 'MCQ' && !_.isEmpty(selectedQuestion?.editorState)) {
        return [selectedQuestion?.editorState];
      } else {
        return [];
      }
    };
    const edataItem: any = {
      'id': selectedQuestion.identifier,
      'title': selectedQuestion.name,
      'desc': selectedQuestion.description,
      'type': selectedQuestion.qType.toLowerCase(),
      'maxscore': key.length === 0 ? 0 : selectedQuestion.responseDeclaration[key].maxScore || 0,
      'params': getParams()
    };

    if (edataItem && this.parentConfig.isSectionsAvailable) {
      edataItem.sectionId = this.sectionConfig.metadata.identifier;
    }

    if (!selectedOption && selectedQuestion.qType.toUpperCase() !== 'SA') {
      this.viewerService.raiseAssesEvent(edataItem, currentIndex + 1, 'No', 0, [], this.slideDuration);
    }

    if (selectedOption) {
      this.player.setRendererState({ singleParam: { paramName: "currentQuestion", paramData: selectedQuestion.body } });
      this.currentOptions = selectedQuestion.interactions[key].options;

      if (option.cardinality === 'single') {
        const correctOptionValue = Number(selectedQuestion.responseDeclaration[key].correctResponse.value);

        this.showAlert = true;
        if (option.option?.value === correctOptionValue) {
          const currentScore = this.player.getScore(currentIndex, key, true);
          this.viewerService.raiseAssesEvent(edataItem, currentIndex + 1, 'Yes', currentScore, [option.option], this.slideDuration);
          this.player.setRendererState({ singleParam: { paramName: "alertType", paramData: 'correct' } });
          if (this.showFeedBack)
            this.correctFeedBackTimeOut(type);
          this.player.updateScoreBoard(this.showFeedBack, currentIndex, 'correct', undefined, currentScore);
        } else {
          const currentScore = this.player.getScore(currentIndex, key, false, option);
          this.player.setRendererState({ singleParam: { paramName: "alertType", paramData: 'wrong' } });
          const classType = this.player.getRendererState().progressBarClass[currentIndex].class === 'partial' ? 'partial' : 'wrong';
          this.player.updateScoreBoard(this.showFeedBack, currentIndex, classType, selectedOptionValue, currentScore);
        }
      }
      if (option.cardinality === 'multiple') {
        const responseDeclaration = this.player.getRendererState().questions[currentIndex].responseDeclaration;
        const currentScore = this.utilService.getMultiselectScore(option.option, responseDeclaration);
        this.showAlert = true;
        if (currentScore === 0) {
          this.player.setRendererState({ singleParam: { paramName: "alertType", paramData: 'wrong' } });
          this.player.updateScoreBoard(this.showFeedBack, currentIndex + 1, 'wrong');
        } else {
          this.player.updateScoreBoard(this.showFeedBack, currentIndex + 1, 'correct', undefined, currentScore);
          if (this.showFeedBack)
            this.correctFeedBackTimeOut(type);
          this.player.setRendererState({ singleParam: { paramName: "alertType", paramData: 'correct' } });
        }
      }
      // selectedOption = undefined;
      this.player.setRendererState({ singleParam: { paramName: "selectedOption", paramData: undefined } });
    } else if ((isQuestionSkipAllowed) || isSubjectiveQuestion || onStartPage || isActive) {
      this.nextSlide();
    } else if (this.startPageInstruction && !selectedOption && !this.active && !this.allowSkip &&
      this.myCarousel.getCurrentSlideIndex() > 0 && this.utilService.getQuestionType(this.player.getRendererState().questions, currentIndex) === 'MCQ'
      && this.utilService.canGo(this.player.getRendererState().progressBarClass[this.myCarousel.getCurrentSlideIndex()])) {
      this.infoPopupTimeOut();
    } else if (!selectedOption && !this.active && !this.allowSkip && this.myCarousel.getCurrentSlideIndex() >= 0
      && this.utilService.getQuestionType(this.player.getRendererState().questions, currentIndex) === 'MCQ'
      && this.utilService.canGo(this.player.getRendererState().progressBarClass[this.myCarousel.getCurrentSlideIndex()])) {
      this.infoPopupTimeOut();
    }
  }

  infoPopupTimeOut() {
    this.infoPopup = true;
    setTimeout(() => {
      this.infoPopup = false;
    }, 2000);
  }

  correctFeedBackTimeOut(type?: string) {
    this.intervalRef = setTimeout(() => {
      this.showAlert = false;
      if (!this.myCarousel.isLast(this.myCarousel.getCurrentSlideIndex()) && type === 'next') {
        this.nextSlide();
      } else if (type === 'previous' && !this.stopAutoNavigation) {
        this.prevSlide();
      } else if (type === 'jump' && !this.stopAutoNavigation) {
        this.goToSlide(this.player.getRendererState().jumpSlideIndex);
      } else if (this.myCarousel.isLast(this.myCarousel.getCurrentSlideIndex())) {
        this.emitSectionEnd();
      }
    }, 4000);
  }

  goToSlide(index) {
    this.viewerService.raiseHeartBeatEvent(eventName.goToQuestion, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    this.disableNext = false;
    this.currentSlideIndex = index;
    this.showRootInstruction = false;
    if (index === 0) {
      this.player.setRendererState({ singleParam: { paramName: "selectedOption", paramData: undefined } });
      this.myCarousel.selectSlide(0);
      this.active = this.currentSlideIndex === 0 && this.sectionIndex === 0 && this.showStartPage;
      this.showRootInstruction = true;
      if (!this.sectionConfig.metadata?.children?.length) {
        this.disableNext = true;
      }
      return;
    }

    this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[this.currentSlideIndex - 1]?.media } });
    this.player.setSkippedClass(this.currentSlideIndex - 1);
    if (!this.player.getRendererState().initializeTimer) {
      this.player.setRendererState({ singleParam: { paramName: "initializeTimer", paramData: true } });
    }
    if (this.player.getRendererState().questions[index - 1] === undefined) {
      this.showQuestions = false;
      this.viewerService.getQuestions(0, index);
      this.currentSlideIndex = index;
    } else if (this.player.getRendererState().questions[index - 1] !== undefined) {
      this.myCarousel.selectSlide(index);
    }
    this.setImageZoom();
    this.currentSolutions = undefined;
    this.highlightQuestion();
  }

  goToQuestion(event) {
    this.active = false;
    this.showRootInstruction = false;
    this.disableNext = false;
    this.player.setRendererState({ singleParam: { paramName: "initializeTimer", paramData: true } });
    const index = event.questionNo;
    this.viewerService.getQuestions(0, index);
    this.currentSlideIndex = index;
    this.myCarousel.selectSlide(index);
    this.highlightQuestion();
  }

  highlightQuestion() {
    const currentQuestion = this.player.getRendererState().questions[this.currentSlideIndex - 1];
    const questionType = currentQuestion?.qType?.toUpperCase();
    const element = document.getElementById(currentQuestion?.identifier) as HTMLElement;
    if (element && questionType) {
      let questionTitleElement;

      switch (questionType) {
        case 'MCQ':
          questionTitleElement = element.querySelector('.mcq-title') as HTMLElement;
          break;
        default:
          questionTitleElement = element.querySelector('.question-container') as HTMLElement;
      }

      if (questionTitleElement) {
        setTimeout(() => {
          questionTitleElement.focus();
        }, 0);
      }
    }
  }

  getSolutions() {
    this.showAlert = false;
    this.viewerService.raiseHeartBeatEvent(eventName.showAnswer, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    this.viewerService.raiseHeartBeatEvent(eventName.showAnswer, TelemetryType.impression, this.myCarousel.getCurrentSlideIndex());
    const currentIndex = this.myCarousel.getCurrentSlideIndex() - 1;
    this.player.setRendererState({ singleParam: { paramName: "currentQuestion", paramData: this.player.getRendererState().questions[currentIndex].body } });
    this.currentOptions = this.player.getRendererState().questions[currentIndex].interactions.response1.options;
    this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[currentIndex]?.media } });
    setTimeout(() => {
      this.setImageZoom();
    });
    setTimeout(() => {
      this.setImageHeightWidthClass();
    }, 100);
    if (this.currentSolutions) {
      this.showSolution = true;
    }
    this.clearTimeInterval();
  }

  viewSolution() {
    this.viewerService.raiseHeartBeatEvent(eventName.viewSolutionClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    this.showSolution = true;
    this.showAlert = false;
    this.player.setRendererState({ singleParam: { paramName: 'currentQuestionsMedia', paramData: this.player.getRendererState().questions[this.myCarousel.getCurrentSlideIndex() - 1]?.media } });
    setTimeout(() => {
      this.setImageZoom();
      this.setImageHeightWidthClass();
    });
    clearTimeout(this.intervalRef);
  }

  closeSolution() {
    this.setImageZoom();
    this.viewerService.raiseHeartBeatEvent(eventName.solutionClosed, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    this.showSolution = false;
    this.myCarousel.selectSlide(this.currentSlideIndex);
    this.focusOnNextButton();
  }

  viewHint() {
    this.viewerService.raiseHeartBeatEvent(eventName.viewHint, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
  }

  onAnswerKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.stopPropagation();
      this.getSolutions();
    }
  }

  showAnswerClicked(event, question?) {
    if (event?.showAnswer) {
      this.focusOnNextButton();
      this.active = true;
      const progressBarClass = this.player.getRendererState().progressBarClass;
      progressBarClass[this.myCarousel.getCurrentSlideIndex() - 1].class = 'correct';
      this.player.setRendererState({ singleParam: { paramName: "progressBarClass", paramData: progressBarClass } });

      if (question) {
        const index = this.player.getRendererState().questions.findIndex(que => que.identifier === question.identifier);
        if (index > -1) {
          let questions = this.player.getRendererState().questions;
          questions[index].isAnswered = true;
          this.viewerService.updateSectionQuestions(this.sectionConfig.metadata.identifier, questions);
        }
      }
      this.viewerService.raiseHeartBeatEvent(eventName.showAnswer, TelemetryType.interact, pageId.shortAnswer);
      this.viewerService.raiseHeartBeatEvent(eventName.pageScrolled, TelemetryType.impression, this.myCarousel.getCurrentSlideIndex() - 1);
    }
  }

  /* Start of Image zoom related */
  setImageHeightWidthClass() {
    document.querySelectorAll('[data-asset-variable]').forEach(image => {
      image.removeAttribute('class');
      if (image.clientHeight > image.clientWidth) {
        image.setAttribute('class', 'portrait');
      } else if (image.clientHeight < image.clientWidth) {
        image.setAttribute('class', 'landscape');
      } else {
        image.setAttribute('class', 'neutral');
      }
    });
  }

  setImageZoom() {
    const index = this.myCarousel.getCurrentSlideIndex() - 1;
    const currentQuestionId = this.player.getRendererState().questions[index]?.identifier;
    document.querySelectorAll('[data-asset-variable]').forEach(image => {
      const imageId = image.getAttribute('data-asset-variable');
      image.setAttribute('class', 'option-image');
      image.setAttribute('id', imageId);
      _.forEach(this.player.getRendererState().currentQuestionsMedia, (val) => {
        if (imageId === val.id) {
          if (this.sectionConfig.metadata.isAvailableLocally && this.parentConfig.baseUrl) {
            if (currentQuestionId) {
              image['src'] = `${this.parentConfig.baseUrl}/${currentQuestionId}/${val.src}`;
            }
          } else if (val.baseUrl) {
            image['src'] = val.baseUrl + val.src;
          }
        }
      });
      const divElement = document.createElement('div');
      divElement.setAttribute('class', 'magnify-icon');
      divElement.onclick = (event) => {
        this.viewerService.raiseHeartBeatEvent(eventName.zoomClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
        this.zoomImgSrc = image['src'];
        this.showZoomModal = true;
        const zoomImage = document.getElementById('imageModal');
        if (zoomImage.clientHeight > image.clientWidth) {
          zoomImage.setAttribute('class', 'portrait');
        } else if (image.clientHeight < image.clientWidth) {
          zoomImage.setAttribute('class', 'landscape');
        } else {
          zoomImage.setAttribute('class', 'neutral');
        }
        event.stopPropagation();
      };
      image.parentNode.insertBefore(divElement, image.nextSibling);
    });
  }

  // Method Name changed
  zoomIn() {
    this.viewerService.raiseHeartBeatEvent(eventName.zoomInClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    this.imageZoomCount = this.imageZoomCount + 10;
    this.setImageModalHeightWidth();
  }

  // Method Name changed
  zoomOut() {
    this.viewerService.raiseHeartBeatEvent(eventName.zoomOutClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    if (this.imageZoomCount > 100) {
      this.imageZoomCount = this.imageZoomCount - 10;
      this.setImageModalHeightWidth();
    }
  }

  setImageModalHeightWidth() {
    this.imageModal.nativeElement.style.width = `${this.imageZoomCount}%`;
    this.imageModal.nativeElement.style.height = `${this.imageZoomCount}%`;
  }

  closeZoom() {
    this.viewerService.raiseHeartBeatEvent(eventName.zoomCloseClicked, TelemetryType.interact, this.myCarousel.getCurrentSlideIndex());
    document.getElementById('imageModal').removeAttribute('style');
    this.showZoomModal = false;
  }
  /* End of Image zoom related */

  clearTimeInterval() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.errorService.getInternetConnectivityError.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

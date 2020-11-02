import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { newQuestionFormatMcq } from './data';
import { data } from './smartLayout-data';


@Component({
  selector: 'quml-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questions: any;
  @Input() linearNavigation: boolean;
  @Input() duration: any;
  @Output() componentLoaded = new EventEmitter<any>();
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
  questionsSorted = [];


  currentSlideIndex = 0;
  attemptedQuestions = [];
  loadScoreBoard = false;
  questionData = data;
  CarouselConfig = {
    NEXT: 1,
    PREV: 2
  };

  constructor() {
    this.endPageReached = false;
  }
  getQuestionData() {
    return newQuestionFormatMcq.result;
  }

  ngOnInit() {
    this.slideInterval = 0;
    this.showIndicator = false;
    this.noWrapSlides = true;
    this.questions = data;
    this.extractData();
  }

  setQuestionType() {
    this.questionClicked.forEach((ele) => {
      ele.questionType = 'mcq';
    });
  }

  nextSlide() {
    if (this.currentSlideIndex !== this.questions.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    }

    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length) {
      this.scoreBoard.splice(0, 1);
      this.loadScoreBoard = true;
      this.endPageReached = true;
      const slide = document.getElementsByTagName('slide');
      return;

    }
    this.car.move(this.CarouselConfig.NEXT);
    this.active = false;
    this.showAlert = false;
    this.optionSelectedObj = undefined;
    if (!this.attemptedQuestions.includes(this.car.getCurrentSlideIndex())) {
      this.attemptedQuestions.push(this.car.getCurrentSlideIndex());
    }
  }

  extractData() {
    for (let i = 0; i < data.length; i++) {
      const currentObject = Object.values(data[i])[0].request;
      this.questionsSorted.push(currentObject);
    }
  }


  getOptionSelected(optionSelected) {
    this.optionSelectedObj = optionSelected;
    this.currentSolutions = optionSelected.solutions;
    this.active = true;
  }

  closeAlertBox() {
    this.showAlert = false;
  }

  viewSolution() {
    this.showSolution = true;
    this.showAlert = false;
  }

  closeSolution() {
    this.showSolution = false;
    this.car.selectSlide(this.currentSlideIndex);
  }

  async validateSelectedOption(option) {
    this.scoreBoardObject = {};
    let updated = false;
    if (this.optionSelectedObj !== undefined) {
      const currentIndex = this.car.getCurrentSlideIndex() - 1;
      this.currentQuestion = this.questions[currentIndex].assessment_item.metadata.editorState.question;
      this.currentOptions = this.questions[currentIndex].assessment_item.metadata.editorState.options;
      this.currentOptions.forEach((ele, index) => {
        if (ele.value.body === option.optionHtml && Boolean(ele.answer)) {
          this.scoreBoardObject['index'] = this.car.getCurrentSlideIndex();
          this.scoreBoardObject['status'] = true;
          this.scoreBoardObject['class'] = 'correct';
          this.showAlert = true;
          this.alertType = true;
        } else if (index === this.currentOptions.length - 1 && !Object.keys(this.scoreBoardObject).length) {
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
    if (this.currentSlideIndex > 1) {
      this.currentSlideIndex = this.currentSlideIndex - 1;
    }
    if (this.car.getCurrentSlideIndex() + 1 === this.questions.length && this.endPageReached) {
      this.endPageReached = false;
    } else if (!this.linearNavigation) {
      this.car.move(this.CarouselConfig.PREV);
    }
  }

  addSlide() {
    this.slides.push(this.questions.length);
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
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
    this.endPageReached = false;
    this.currentSlideIndex = 1;
    this.car.selectSlide(0);
  }

  goToSlide(index) {
    this.currentSlideIndex = index + 1;
    this.car.selectSlide(index);
  }

}

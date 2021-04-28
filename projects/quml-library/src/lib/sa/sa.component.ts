import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { shortAnswerQuestionData } from './data';

declare var katex: any;

@Component({
  selector: 'quml-sa',
  templateUrl: './sa.component.html',
  styleUrls: ['./sa.component.scss', '../quml-library.component.scss']
})
export class SaComponent implements OnInit {

  @Input() questions?: any;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() showAnswerClicked = new EventEmitter<any>();
  showAnswer = false;
  solutions: any;
  question: any;
  answer: any;
  constructor(
    public domSanitizer: DomSanitizer
  ) {

  }

  showAnswerToUser(){
    this.showAnswer = true;
    this.showAnswerClicked.emit({
      showAnswer: this.showAnswer
    })
  }

  ngOnInit() {
    this.question = this.questions.body;
    this.answer = this.questions.answer;
    this.solutions = this.questions.solutions;
    this.questions.solutions.forEach(ele => {
      if (ele.type === 'video') {
        this.questions.media.forEach(e => {
          if (ele.value === e.id) {
            ele.src = (e.baseUrl || '') + e.src;
            ele.thumbnail = e.thumbnail;
          }
        });
      }
    });
  }
}

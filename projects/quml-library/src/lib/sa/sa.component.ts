import { Component, OnInit, Input, SecurityContext, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { shortAnswerQuestionData } from './data';

declare var katex: any;

@Component({
  selector: 'quml-sa',
  templateUrl: './sa.component.html',
  styleUrls: ['./sa.component.scss', '../quml-library.component.scss']
})
export class SaComponent implements OnInit, OnChanges {

  @Input() questions?: any;
  @Input() replayed?: boolean;
  @Input() baseUrl: string;
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

  ngOnChanges() {
    if(this.replayed) {
      this.showAnswer = false;
    }
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
      if (ele.type === 'video' || ele.type === 'image') {
        this.questions.media.forEach(e => {
          if (ele.value === e.id) {
            if (this.baseUrl) {
              ele.src = `${this.baseUrl}/${this.questions.identifier}/${e.src}`;
            } else {
              ele.src = e.baseUrl ? e.baseUrl + e.src : e.src;
            }

            console.log('media src', ele.src);

            if (e.thumbnail) {
              ele.thumbnail = e.thumbnail;
            }
          }
        });
      } 
    });
  }
}

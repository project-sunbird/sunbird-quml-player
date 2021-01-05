import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { shortAnswerQuestionData } from './data';

declare var katex: any;

@Component({
  selector: 'quml-sa',
  templateUrl: './sa.component.html',
  styleUrls: ['./sa.component.css', '../quml-library.component.css']
})
export class SaComponent implements OnInit {

  @Input() questions?: any;
  @Output() componentLoaded = new EventEmitter<any>();
  showAnswer = false;
  solutions: any;
  question: any;
  answer: any;
  constructor(
    public domSanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.question = this.questions.request.question.editorState.question;
    this.solutions = this.questions.request.question.editorState.answer;
  }

}

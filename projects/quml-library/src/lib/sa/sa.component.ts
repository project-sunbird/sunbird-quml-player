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
  @Input() layout?: string;
  @Output() componentLoaded = new EventEmitter<any>();
  @Input() identifier: any;
  shortAnswerQuestion: string;
  ShortAnswerSolution: string;
  imageUrl;
  videoUrl;
  showedAnswer = false;
  showImagePopup = false;
  baseUrl = 'https://staging.ntp.net.in/';

  constructor(
    public domSanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.renderLatex();
    this.questions = this.questions ? this.questions : shortAnswerQuestionData;
    this.layout = this.layout ? this.layout : 'new';
    // if (this.questions['__cdata'] != null) {
    //   const parsedQuestionData = JSON.parse(this.questions['__cdata']);
    //   this.shortAnswerQuestion = this.domSanitizer.sanitize
    //     (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(parsedQuestionData.question));
    //   this.ShortAnswerSolution = this.domSanitizer.sanitize(SecurityContext.HTML,
    //     this.domSanitizer.bypassSecurityTrustHtml(parsedQuestionData.answer));
    // } else {
    //   this.shortAnswerQuestion = this.domSanitizer.sanitize
    //     (SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(this.questions.result.assessment_item.body));
    //   this.ShortAnswerSolution = this.domSanitizer.sanitize(SecurityContext.HTML,
    //     this.domSanitizer.bypassSecurityTrustHtml(this.questions.result.assessment_item.solutions[0]));
    // }
    this.shortAnswerQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,
      this.domSanitizer.bypassSecurityTrustHtml(this.questions.question));
    this.ShortAnswerSolution = this.domSanitizer.sanitize(SecurityContext.HTML,
      this.domSanitizer.bypassSecurityTrustHtml(this.questions.answer));
    if (this.questions.media) {
      this.getUrl();
    }
  }


  getUrl() {
    for (const ele of this.questions.media) {
      if (ele.type === 'image') {
        this.imageUrl = this.baseUrl + ele.src;
      } else if (ele.type === 'video') {
        this.videoUrl = ele.src;
      }
    }
  }
  renderLatex() {
    const _instance = this;
    setTimeout(function () {
      _instance.replaceLatexText();
    }, 0);
  }
  replaceLatexText() {
    const questionElement = document.getElementById(this.identifier);
      const mathTextDivs = questionElement.getElementsByClassName('mathText');
      for (let i = 0; i < mathTextDivs.length; i++) {
        const mathExp = mathTextDivs[i];
        const textToRender = mathExp.innerHTML;
        katex.render(textToRender, mathExp, { displayMode: false, output: 'html', throwOnError: true });
      }
  }

  switchLayout(stripData) {
    this.layout = stripData.text;
    this.renderLatex();
  }

}

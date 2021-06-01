import { Component, OnInit, Input, SecurityContext, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { katex } from 'katex';
import { UtilService } from '../util-service';

declare var katex: any;

@Component({
  selector: 'quml-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss', '../quml-library.component.scss'],

})
export class McqComponent implements OnInit, AfterViewInit {
  @Input() public question?: any;
  @Input() identifier: any;
  @Input() public layout?: string;
  @Input() replayed : boolean;
  @Input() tryAgain?: boolean;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() answerChanged = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter<number>();

  mcqQuestion: any;
  options: any;
  mcqOptions: any[] = [];
  selectedOptionTarget: any;
  showQumlPopup = false;
  solutions: Array<[]>;
  cardinality: string;



  constructor(
    public domSanitizer: DomSanitizer , 
    public utilService: UtilService) {
  }

  async ngOnInit() {

    if (this.question.solutions) {
      this.solutions = this.question.solutions;
    }
    let  key:any = this.utilService.getKeyValue(Object.keys(this.question.responseDeclaration));
    this.cardinality = this.question.responseDeclaration[key]['cardinality'];
    if (this.question.templateId === "mcq-vertical") {
      this.layout = 'DEFAULT';
    } else if (this.question.templateId === "mcq-horizontal") {
      this.layout = 'IMAGEGRID';
    } else if (this.question.templateId === "mcq-vertical-split") {
      this.layout = 'IMAGEQAGRID';
    } else if (this.question.templateId === "mcq-grid-split") {
      this.layout = 'MULTIIMAGEGRID';
    }
    this.renderLatex();
    this.mcqQuestion = this.domSanitizer.sanitize(SecurityContext.HTML,
      this.domSanitizer.bypassSecurityTrustHtml(this.question.body));
    this.options = this.question.interactions[key].options;
    this.initOptions();
  }

  ngAfterViewInit() {
    const el = document.getElementsByClassName('mcq-options');
    if (el != null && el.length > 0) {
      el[0].remove();
    }
  }

  initOptions() {
    for (let j = 0; j < this.options.length; j++) {
      let imageUrl;
      if (this.options[j].url) {
        imageUrl = this.options[j].url;
      }
      const option = this.options[j];
      const optionValue = option.value.body;
      const optionHtml = this.domSanitizer.sanitize(SecurityContext.HTML, this.domSanitizer.bypassSecurityTrustHtml(optionValue));
      const selected = false;
      const optionToBePushed: any = {};
      optionToBePushed.index = j;
      optionToBePushed.optionHtml = optionHtml;
      optionToBePushed.selected = selected;
      optionToBePushed.url = imageUrl;
      this.mcqOptions.push(optionToBePushed);
    }
  }



  renderLatex() {
    const _instance = this;
    setTimeout(function () {
      _instance.replaceLatexText();
      const images = document.getElementsByTagName('img');
      if (images != null && images.length > 0) {
      }
    }, 100);
  }

  replaceLatexText() {
    const questionElement = document.getElementById(this.identifier);
    if (questionElement != null) {
      const mathTextDivs = questionElement.getElementsByClassName('mathText');
      for (let i = 0; i < mathTextDivs.length; i++) {
        const mathExp = mathTextDivs[i];
        const textToRender = mathExp.innerHTML;
        katex.render(textToRender, mathExp, { displayMode: false, output: 'html', throwOnError: true });
      }
    }
  }

  onOptionSelect(event) {
    const mcqOption = event.option;
    const solutions = event.solutions;
    this.mcqOptions.forEach(mcqOptionElement => {
      if (mcqOptionElement.index === event.option.index) {
        mcqOptionElement.selected = true;
      } else {
        mcqOptionElement.selected = false;
      }
    });
    mcqOption.solutions = solutions;
    this.getSelectedOptionAndResult(mcqOption);

  }
  optionSelectedInImage(event) {
    this.onOptionSelect(event);
  }

  getSelectedOptionAndResult(optionObj) {
    this.optionSelected.emit(optionObj);
  }

  showPopup() {
    this.showQumlPopup = true;
  }

  closePopUp() {
    this.showQumlPopup = false;
  }

}

import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'quml-sa',
  templateUrl: './sa.component.html',
  styleUrls: ['./sa.component.scss', '../quml-library.component.scss']
})
export class SaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() questions?: any;
  @Input() replayed?: boolean;
  @Input() baseUrl: string;
  @Output() componentLoaded = new EventEmitter<any>();
  @Output() showAnswerClicked = new EventEmitter<any>();

  showAnswer = false;
  solutions: any;
  question: any;
  answer: any;
  constructor( public domSanitizer: DomSanitizer ) { }

  ngOnChanges() {
    if (this.replayed) {
      this.showAnswer = false;
    } else if (this.questions?.isAnswerShown) {
      this.showAnswer = true;
    }
  }

  showAnswerToUser() {
    this.showAnswer = true;
    this.showAnswerClicked.emit({
      showAnswer: this.showAnswer
    });
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.showAnswerToUser();
    }
  }

  handleKeyboardAccessibility() {
    const elements = Array.from(document.getElementsByClassName('option-body') as HTMLCollectionOf<Element>);
    elements.forEach((element: HTMLElement) => {
      if (element.offsetHeight) {
        const children = Array.from(element.querySelectorAll("a"));
        children.forEach((child: HTMLElement) => {
            child.setAttribute('tabindex', '-1');
        });
      }
    });
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

            if (e.thumbnail) {
              ele.thumbnail = e.thumbnail;
            }
          }
        });
      } 
    });
  }

  ngAfterViewInit() {
    this.handleKeyboardAccessibility()
  }
}

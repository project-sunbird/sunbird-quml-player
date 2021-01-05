import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.scss']
})
export class McqQuestionComponent implements OnInit {

  @Input() mcqQuestion: any;
  @Output() showPopup = new EventEmitter();
  @Input() layout: any;

  constructor() { }

  ngOnInit() {
  }

  showQumlPopup() {
    this.showPopup.emit();
  }

}

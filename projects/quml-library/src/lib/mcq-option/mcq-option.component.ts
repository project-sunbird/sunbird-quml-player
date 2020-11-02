import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-mcq-option',
  templateUrl: './mcq-option.component.html',
  styleUrls: ['./mcq-option.component.css']
})
export class McqOptionComponent implements OnInit {

  @Input() mcqOptions: any;
  @Input() solutions: any;
  @Input() layout: any;
  @Output() showPopup = new EventEmitter();
  @Output() optionSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onOptionSelect(event, mcqOption) {
    this.optionSelected.emit(
      {
        name: 'optionSelect',
        option: mcqOption,
        solutions: this.solutions
      }
    );
  }
  onImageOptionSelected(event) {
    this.onOptionSelect(event, event.option);
  }

  showQumlPopup() {
    this.showPopup.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-mcq-option',
  templateUrl: './mcq-option.component.html',
  styleUrls: ['./mcq-option.component.scss']
})
export class McqOptionComponent implements OnInit {

  @Input() mcqOptions: any;
  @Input() solutions: any;
  @Input() layout: any;
  @Input() cardinality: string;
  @Output() showPopup = new EventEmitter();
  @Output() optionSelected = new EventEmitter<any>();
  selectedOption = []; 

  constructor() { }

  ngOnInit() {
  }

  onOptionSelect(event, mcqOption) {
    this.mcqOptions.forEach((ele) => {
      if (this.cardinality === 'single') {
        if (ele.label === mcqOption.label) {
          ele.selected = true;
        } else {
          ele.selected = false;
        }
      } else if(this.cardinality === 'multiple') {
        if (ele.label === mcqOption.label) {
          ele.selected = true;
          this.selectedOption.push(mcqOption)
        }
      }
    });
    this.optionSelected.emit(
      {
        name: 'optionSelect',
        option: this.cardinality === 'single' ? mcqOption : this.selectedOption,
        cardinality: this.cardinality,
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

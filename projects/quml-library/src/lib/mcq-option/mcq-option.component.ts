import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UtilService } from '../util-service';

@Component({
  selector: 'quml-mcq-option',
  templateUrl: './mcq-option.component.html',
  styleUrls: ['./mcq-option.component.scss']
})
export class McqOptionComponent implements OnChanges {

  @Input() mcqOptions: any;
  @Input() solutions: any;
  @Input() layout: any;
  @Input() cardinality: string;
  @Output() showPopup = new EventEmitter();
  @Output() optionSelected = new EventEmitter<any>();
  selectedOption = []; 
  @Input() replayed : boolean;
  @Input() tryAgain? : boolean;

  constructor(
    public utilService : UtilService
  ) { }

  ngOnChanges() {
    if(this.replayed) {
      this.mcqOptions.forEach((ele) => {
         ele.selected = false;
      })
    }
    if (this.tryAgain) {
      this.unselectOption();
    }
  }

  unselectOption(){
    this.mcqOptions.forEach((ele) => {
      ele.selected = false;
    });
    this.selectedOption = [];
    this.optionSelected.emit(
      {
        name: 'optionSelect',
        option: this.selectedOption,
        cardinality: this.cardinality,
        solutions: this.solutions
      }
    );
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
        if (ele.label === mcqOption.label && !this.utilService.hasDuplicates(this.selectedOption , mcqOption)) {
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

  onEnter(event: KeyboardEvent, mcqOption) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.onOptionSelect(event, mcqOption);
    }
  }
}

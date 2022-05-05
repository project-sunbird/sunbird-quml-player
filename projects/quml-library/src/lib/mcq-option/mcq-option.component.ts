import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cardinality } from '../telemetry-constants';
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
  @Input() replayed: boolean;
  @Input() tryAgain?: boolean;

  constructor(
    public utilService: UtilService
  ) { }

  ngOnChanges() {
    if (this.replayed) {
      this.mcqOptions.forEach((ele) => {
        ele.selected = false;
      })
    }
    if (this.tryAgain) {
      this.unselectOption();
    }
  }

  unselectOption() {
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

  onOptionSelect(event: MouseEvent | KeyboardEvent, mcqOption, index?: number) {
    if (event.hasOwnProperty('stopImmediatePropagation')) {
      event.stopImmediatePropagation();
    }
    if (this.cardinality === Cardinality.single) {
      if (index !== undefined) {
        this.mcqOptions.forEach((ele) => ele.selected = false);
        this.mcqOptions[index].selected = this.mcqOptions[index].label === mcqOption.label
      } else {
        this.mcqOptions.forEach(element => {
          element.selected = element.label === mcqOption.label;
        });
      }
    } else if (this.cardinality === Cardinality.multiple) {
      this.mcqOptions.forEach(element => {
        if (element.label === mcqOption.label && !this.utilService.hasDuplicates(this.selectedOption, mcqOption)) {
          element.selected = true;
          this.selectedOption.push(mcqOption)
        }
      });
    }

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

  onEnter(event: KeyboardEvent, mcqOption, index: number) {
    if (event.key === 'Enter') {
      event.stopPropagation();
      this.onOptionSelect(event, mcqOption, index);
    }
  }
}

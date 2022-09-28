import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quml-mcq-image-option',
  templateUrl: './mcq-image-option.component.html',
  styleUrls: ['./mcq-image-option.component.scss']
})
export class McqImageOptionComponent {
  showQumlPopup = false;
  qumlPopupImage: any;
  @Input() mcqQuestion: any;
  @Input() solutions: any;
  @Input() mcqOption: any;
  @Output() imgOptionSelected = new EventEmitter();

  showPopup(image) {
    this.showQumlPopup = true;
    this.qumlPopupImage = image;
  }

  optionClicked(event, mcqOption) {
    /* istanbul ignore else */
    if (event.hasOwnProperty('stopImmediatePropagation')) {
      event.stopImmediatePropagation();
    }
    this.imgOptionSelected.emit(
      {
        name: 'optionSelect',
        option: mcqOption,
        solutions: this.solutions
      });
  }

  onEnter(event: KeyboardEvent, mcqOption) {
    /* istanbul ignore else */
    if (event.key === 'Enter') {
      event.stopPropagation();
      this.optionClicked(event, mcqOption);
    }
  }

  openPopup(optionHtml) {
    this.showQumlPopup = true;
    this.qumlPopupImage = optionHtml;
  }

  closePopUp() {
    this.showQumlPopup = false;
  }
}

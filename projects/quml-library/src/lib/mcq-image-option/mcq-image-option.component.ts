import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-mcq-image-option',
  templateUrl: './mcq-image-option.component.html',
  styleUrls: ['./mcq-image-option.component.scss']
})
export class McqImageOptionComponent implements OnInit {
  showQumlPopup = false;
  qumlPopupImage: any;
  @Input() mcqQuestion: any;
  @Input() solutions: any;
  @Input() mcqOption: any;
  @Output() imgOptionSelected = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showPopup(image) {
    this.showQumlPopup = true;
    this.qumlPopupImage = image;

  }

  optionClicked(mcqOption) {
    this.imgOptionSelected.emit(
      {
        name: 'optionSelect',
        option: mcqOption,
        solutions: this.solutions
      }
    );
  }

  openPopup(optionHtml) {
    this.showQumlPopup = true;
    this.qumlPopupImage = optionHtml;
    console.log('----->>> option html', optionHtml);

  }

  closePopUp() {
    this.showQumlPopup = false;
  }

}

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'quml-quml-popup',
  templateUrl: './quml-popup.component.html',
  styleUrls: ['./quml-popup.component.scss']
})
export class QumlPopupComponent implements OnInit, AfterViewInit {
  @Input() image = 'https://via.placeholder.com/65';
  @Input() htmlTag: any;
  @Output() popUpClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementById('htmlTag').getElementsByTagName('img')[0].style.width = '70%';
  }

  closePopup() {
    this.popUpClose.emit();
  }

}

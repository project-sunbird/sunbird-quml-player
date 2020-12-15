import { Component, OnInit, Output , EventEmitter  } from '@angular/core';

@Component({
  selector: 'quml-portrait-header',
  templateUrl: './portrait-header.component.html',
  styleUrls: ['./portrait-header.component.scss']
})
export class PortraitHeaderComponent implements OnInit {

  @Output() nextSlideClicked = new EventEmitter<any>();
  @Output() prevSlideClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }


  nextSlide() {
    this.nextSlideClicked.emit({event : 'next clicked'});
  }

  prevSlide() {
    this.prevSlideClicked.emit({event : 'previous clicked'});
  }

}

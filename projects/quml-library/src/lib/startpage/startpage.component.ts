import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quml-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss', './sb-ckeditor-styles.scss']
})
export class StartpageComponent implements OnInit {

  @Input() instructions: any;
  @Input() totalNoOfQuestions: number;
  @Input() points: number;
  @Input() time: number;
  @Input() contentName: string;
  @Input() showTimer: boolean;
  minutes: number;
  seconds: string | number;

  ngOnInit() {
    const durationInSec = this.time / 1000;
    this.minutes = Math.floor(this.time / 60);
    this.seconds = this.time - this.minutes * 60 <  10 ? `0${this.time - this.minutes * 60}`  :  this.time - this.minutes * 60;
  }

}

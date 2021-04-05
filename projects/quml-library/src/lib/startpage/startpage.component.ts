import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'quml-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  @Input() instructions: any;
  @Input() totalNoOfQuestions: number;
  @Input() points: number;
  @Input() time: number;
  @Input() contentName: string;
  @Input() showTimer: boolean;
  minutes: number;
  seconds: any;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.instructions = this._sanitizer.bypassSecurityTrustHtml(this.instructions);
    const durationInSec = this.time / 1000;
    this.minutes = Math.floor(this.time / 60);
    this.seconds = this.time - this.minutes * 60 <  10 ? `0${this.time - this.minutes * 60}`  :  this.time - this.minutes * 60;
  }

}

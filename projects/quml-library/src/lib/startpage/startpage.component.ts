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
  minutes: number;
  seconds: number;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    const durationInSec = this.time / 1000;
    this.minutes = ~~(durationInSec / 60);
    this.seconds = (durationInSec % 60);
  }

}

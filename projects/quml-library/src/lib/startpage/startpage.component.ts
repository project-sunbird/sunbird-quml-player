import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quml-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  @Input() instructions: string;
  @Input() totalNoOfQuestions: number;
  @Input() maxScore: number;
  @Input() time: number;
  minutes: number;
  seconds: number;

  constructor() { }

  ngOnInit() {
    const durationInSec = this.time / 1000;
    this.minutes = ~~(durationInSec / 60);
    this.seconds = (durationInSec % 60);
  }

}

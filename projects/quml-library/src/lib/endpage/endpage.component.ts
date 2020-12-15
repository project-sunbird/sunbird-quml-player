import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'quml-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.scss']
})
export class EndpageComponent implements OnInit {
  @Input() scoreSummary;
  @Output() replayContentEvent = new EventEmitter<any>();
  score: any;
  constructor() {

  }

  ngOnInit() {
   console.log('score summary' , this.scoreSummary);
  }
  replayContent($event) {
    this.replayContentEvent.emit({});
  }
  exitContent($event) {
    console.log("Exit Content");
  }

}

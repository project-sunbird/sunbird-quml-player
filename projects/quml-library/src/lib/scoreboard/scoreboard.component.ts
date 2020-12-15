import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @Input() scores: Array<[]>;
  @Output() submitClicked = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log('scores here', this.scores);
  }

}

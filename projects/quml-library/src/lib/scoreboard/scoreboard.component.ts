import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quml-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  @Input() scores: Array<[]>;
  constructor() { }

  ngOnInit() {
    console.log('scores here', this.scores);
  }

}

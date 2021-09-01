import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quml-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @Input() scores: any;
  @Input() totalNoOfQuestions: number;
  @Input() contentName: string;
  @Input() showFeedBack: boolean;
  @Input() isSections: boolean;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() emitQuestionNo = new EventEmitter<any>();
  @Output() scoreBoardLoaded = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log(this.scores);
    this.scoreBoardLoaded.emit({
      scoreBoardLoaded: true
    });
  }

  goToQuestion(index: number, identifier?: string) {
    this.emitQuestionNo.emit({ questionNo: index, identifier });
  }
}

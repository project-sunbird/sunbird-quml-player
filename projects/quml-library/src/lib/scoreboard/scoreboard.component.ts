import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'quml-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  @Input() scores: any;
  @Input() totalNoOfQuestions: number;
  @Input() contentName: string;
  @Input() showFeedBack: boolean;
  @Input() isSections: boolean;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() emitQuestionNo = new EventEmitter<any>();
  @Output() scoreBoardLoaded = new EventEmitter<any>();

  subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this.scoreBoardLoaded.emit({
      scoreBoardLoaded: true
    });

    this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      if (e['key'] === 'Enter') {
        e.stopPropagation();
        (document.activeElement  as HTMLElement).click();
      }
    });
  }

  goToQuestion(index: number, identifier?: string) {
    this.emitQuestionNo.emit({ questionNo: index, identifier });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

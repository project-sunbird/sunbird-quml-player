import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ISummary } from '../quml-library-interface';
import { ViewerService } from '../services/viewer-service/viewer-service';
import { eventName, pageId, TelemetryType } from '../telemetry-constants';

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
  @Input() summary: ISummary;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() emitQuestionNo = new EventEmitter<any>();
  @Output() scoreBoardLoaded = new EventEmitter<any>();

  subscription: Subscription;
  constructor(private viewerService: ViewerService) { }

  ngOnInit() {
    this.scoreBoardLoaded.emit({
      scoreBoardLoaded: true
    });

    this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      /* istanbul ignore else */
      if (e['key'] === 'Enter') {
        e.stopPropagation();
        (document.activeElement  as HTMLElement).click();
      }
    });
  }

  goToQuestion(index: number, identifier?: string) {
    this.emitQuestionNo.emit({ questionNo: index, identifier });
  }

  onReviewClicked() {
    if (this.isSections) {
      this.goToQuestion(1, this.scores[0].identifier);
    } else {
      this.goToQuestion(1);
    }
    this.viewerService.raiseHeartBeatEvent(eventName.scoreBoardReviewClicked, TelemetryType.interact, pageId.submitPage);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

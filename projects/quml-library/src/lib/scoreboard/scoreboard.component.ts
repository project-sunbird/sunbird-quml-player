import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TelemetryService } from '../player/src/TelemetryService';
import { ISummary } from '../quml-library-interface';
import { eventName, pageId, TelemetryType } from '../telemetry-constants';
import { PlayerService } from '../services/player.service';
import { Player } from '../../public_api';

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
  player: Player;
  telemetryService: TelemetryService;
  constructor(private playerService: PlayerService) {
    this.player = this.playerService.getPlayerInstance();
    this.telemetryService = TelemetryService.getInstance(this.player);
  }

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
    this.telemetryService.emitHeartBeatEvent(eventName.scoreBoardReviewClicked, TelemetryType.interact, pageId.submitPage);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

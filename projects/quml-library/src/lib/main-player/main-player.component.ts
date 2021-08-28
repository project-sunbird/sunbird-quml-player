import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { contentErrorMessage } from '@project-sunbird/sunbird-player-sdk-v9/lib/player-utils/interfaces/errorMessage';
import * as _ from 'lodash-es';
import { QumlPlayerConfig } from '../quml-library-interface';
import { ViewerService } from '../services/viewer-service/viewer-service';
import { eventName, pageId, TelemetryType } from '../telemetry-constants';
import { UtilService } from '../util-service';

@Component({
  selector: 'quml-main-player',
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.scss']
})
export class MainPlayerComponent implements OnInit {

  @Input() QumlPlayerConfig: QumlPlayerConfig;
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();

  sections: any[] = [];
  activeSection: any;
  isSectionsAvailable = false;
  isMultiLevelSection = false;
  isFirstSection = false;
  contentError: contentErrorMessage;
  parentConfig = {
    loadScoreBoard: false,
    requiresSubmit: false,
    isFirstSection: false,
    contentName: ''
  };

  endPageReached = false;
  loadScoreBoard = false;
  showEndPage = true;
  showFeedBack: boolean;
  attempts: { max: number, current: number };
  mainProgressBar = [];
  isEndEventRaised = false;
  isSummaryEventRaised = false;
  summary: {
    correct: 0
    partial: 0
    skipped: 0
    wrong: 0
  };
  finalScore = 0;
  showReplay = true;
  currentSlideIndex = 0;
  totalNoOfQuestions = 0;
  durationSpent: string;
  outcomeLabel: string;
  totalScore: number;
  initialTime: number;
  sideMenuConfig = {
    enable: true,
    showShare: true,
    showDownload: true,
    showReplay: false,
    showExit: true,
  };
  userName: string;


  constructor(public viewerService: ViewerService, private utilService: UtilService) { }

  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit(): void {
    this.QumlPlayerConfig.metadata.currentAttempt = 1;
    this.setConfig();
    this.initializeSections();
  }

  initializeSections() {
    const childMimeType = _.map(this.QumlPlayerConfig.metadata.children, 'mimeType');
    this.isSectionsAvailable = childMimeType[0] === 'application/vnd.sunbird.questionset';

    if (this.isSectionsAvailable) {
      this.isMultiLevelSection = this.getMultilevelSection(this.QumlPlayerConfig.metadata);

      if (this.isMultiLevelSection) {
        this.contentError = {
          messageHeader: 'Unable to load content',
          messageTitle: 'Multi level sections are not supported as of now'
        };
      } else {
        const children = this.QumlPlayerConfig.metadata.children;

        this.sections = _.map(children, (child) => {
          let childNodes = child.children.map(item => item.identifier);
          if (child?.shuffle) {
            childNodes = _.shuffle(childNodes);
          }
          if (this.QumlPlayerConfig.metadata.timeLimits) {
            child = {
              ...child,
              timeLimits: this.QumlPlayerConfig.metadata.timeLimits,
              showTimer: this.QumlPlayerConfig.metadata.showTimer
            };
          }
          return {
            ...this.QumlPlayerConfig, metadata: { ...child, childNodes },
          };
        });

        this.setInitialScores();
        this.activeSection = this.sections[0];
        this.isFirstSection = true;
        console.log(this.sections);
      }
    } else {
      this.activeSection = this.QumlPlayerConfig;
    }
  }

  setConfig() {
    this.parentConfig.contentName = this.QumlPlayerConfig.metadata?.name;
    this.parentConfig.requiresSubmit = this.QumlPlayerConfig.metadata?.requiresSubmit?.toLowerCase() !== 'no';
    this.showEndPage = this.QumlPlayerConfig.metadata?.showEndPage?.toLowerCase() !== 'no';
    this.showFeedBack = this.QumlPlayerConfig.metadata?.showFeedback?.toLowerCase() !== 'no';
    this.sideMenuConfig = { ...this.sideMenuConfig, ...this.QumlPlayerConfig.config.sideMenu };
    this.userName = this.QumlPlayerConfig.context.userData.firstName + ' ' + this.QumlPlayerConfig.context.userData.lastName;
    this.attempts = { max: this.QumlPlayerConfig.metadata?.maxAttempts, current: this.QumlPlayerConfig.metadata?.currentAttempt + 1 };
    this.totalScore = this.QumlPlayerConfig.metadata.maxScore;
    this.showReplay = this.attempts?.max !== this.attempts?.current;
    if (typeof this.QumlPlayerConfig.metadata?.timeLimits === 'string') {
      this.QumlPlayerConfig.metadata.timeLimits = JSON.parse(this.QumlPlayerConfig.metadata.timeLimits);
    }
    this.initialTime = new Date().getTime();
    this.emitMaxAttemptEvents();
  }

  private getMultilevelSection(obj) {
    let isMultiLevel;
    obj.children.forEach(item => {
      if (item.children && !isMultiLevel) {
        isMultiLevel = this.hasChildren(item.children);
      }

    });
    return isMultiLevel;
  }

  private hasChildren(arr) {
    return arr.some(item => item.children);
  }

  emitMaxAttemptEvents() {
    if ((this.QumlPlayerConfig.metadata?.maxAttempt - 1) === this.QumlPlayerConfig.metadata?.currentAttempt) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, false, true));
    } else if (this.QumlPlayerConfig.metadata?.currentAttempt >= this.QumlPlayerConfig.metadata?.maxAttempt) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, true, false));
    }
  }

  onSectionEnd(event) {
    const activeSectionIndex = this.sections.indexOf(this.activeSection);
    this.setNextSection(event, activeSectionIndex);
    console.log('Event', event, activeSectionIndex);
  }

  setNextSection(event, activeSectionIndex: number) {
    this.summary = this.utilService.sumObjectsByKey(this.summary, event.summary);
    const isSectionFullyAttempted = event.summary.skipped === 0;
    const isSectionPartiallyAttempted = event.summary.skipped > 0;
    console.log('Summary', this.summary);

    const nextSectionIndex = activeSectionIndex + 1;
    if (nextSectionIndex < this.sections.length) {
      this.activeSection = this.sections[nextSectionIndex];
      this.mainProgressBar.forEach((item, index) => {
        item.isActive = index === nextSectionIndex;

        if (index === activeSectionIndex) {
          if (isSectionFullyAttempted) {
            item.class = 'attempted';
          } else if (isSectionPartiallyAttempted) {
            item.class = 'partial';
          }
        }
      });
      console.log('mainProgressBar', this.mainProgressBar);
    } else {
      // this.parentConfig.endPageReached = true;
      // this.endPageReached = true;
      this.prepareEnd(event);
    }
  }

  prepareEnd(event) {
    this.loadScoreBoard = true;
    if (this.QumlPlayerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
    // this.playerEvent.emit(this.viewerService.generateEndEvent(event));
  }

  replayContent() {
    if (this.isSectionsAvailable) {
      this.activeSection = this.sections[0];
    } else {
      this.activeSection = this.QumlPlayerConfig;
    }
  }

  setInitialScores(activeSectionIndex = 0) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    this.sections.forEach((section, i) => {
      this.mainProgressBar.push({
        index: alphabets[i].toLocaleUpperCase(), class: 'unattempted', value: undefined,
        score: 0,
        isActive: i === activeSectionIndex,
        identifier: section.metadata?.identifier
      });
      const children = [];
      section.metadata.childNodes.forEach((child, index) => {
        children.push({
          index: (index + 1), class: 'unattempted', value: undefined,
          score: 0,
        });
        this.totalNoOfQuestions++;
      });
      this.mainProgressBar[this.mainProgressBar.length - 1] = {
        ..._.last(this.mainProgressBar), children
      };
    });

    console.log('mainProgressBar', this.mainProgressBar, this.totalNoOfQuestions);
  }

  calculateScore() {
    if (this.isSectionsAvailable) {
      // loop though
    } else {
      // calculate score for single
    }
    this.generateOutComeLabel();
  }

  exitContent(event) {
    this.calculateScore();
    if (event?.type === 'EXIT') {
      this.viewerService.raiseHeartBeatEvent(eventName.endPageExitClicked, TelemetryType.interact, 'endPage');
      // const summaryObj = this.createSummaryObj();
      this.viewerService.raiseSummaryEvent(this.currentSlideIndex, this.endPageReached, this.finalScore, this.summary);
      this.isSummaryEventRaised = true;
      this.raiseEndEvent(this.currentSlideIndex, 'endPage', this.finalScore);
    }
  }


  raiseEndEvent(currentQuestionIndex, endPageSeen, score) {
    if (this.isEndEventRaised) {
      return;
    }
    this.isEndEventRaised = true;
    this.viewerService.raiseEndEvent(currentQuestionIndex, endPageSeen, score);

    if (_.get(this.attempts, 'current') >= _.get(this.attempts, 'max')) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(_.get(this.attempts, 'current'), true, false));
    }
  }

  setDurationSpent() {
    if (this.QumlPlayerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
  }

  onScoreBoardLoaded(event) {
  }

  onScoreBoardSubmitted() {
    if (this.QumlPlayerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
    this.viewerService.raiseHeartBeatEvent(eventName.scoreBoardSubmitClicked, TelemetryType.interact, pageId.submitPage);
    this.loadScoreBoard = false;
    this.viewerService.raiseSummaryEvent(this.currentSlideIndex, this.endPageReached, this.finalScore, this.summary);
    this.isSummaryEventRaised = true;
    this.endPageReached = true;
    this.raiseEndEvent(this.currentSlideIndex, this.endPageReached, this.finalScore);
  }

  generateOutComeLabel() {
    this.outcomeLabel = this.finalScore.toString();
    switch (_.get(this.QumlPlayerConfig, 'metadata.summaryType')) {
      case 'Complete': {
        this.outcomeLabel = this.totalScore ? `${this.finalScore} / ${this.totalScore}` : this.outcomeLabel;
        break;
      }
      case 'Duration': {
        this.outcomeLabel = '';
        break;
      }
    }
  }

  goToQuestion(event) { }

  emitPlayerEvent(event) {
    this.playerEvent.emit(event);
  }

  emitTelemetryEvent(event) {
    this.telemetryEvent.emit(event);
  }



}


/*
 * Should Take care of the following
 *  - handle end page
 *  - handle scoreboard
 *  - handle max Attempts
 *  - handle telemetry initialization
 *  - handle telemetry events - endpage / scoreboard / maxattempts
 *  - handle Jump to question or section
 *  - handle summary event
 *  - handle next/previous button on start and end of the section
 * -  handle raising all the outputs back to the client
*/

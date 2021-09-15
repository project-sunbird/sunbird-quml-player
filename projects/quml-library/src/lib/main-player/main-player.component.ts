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

  @Input() playerConfig: QumlPlayerConfig;
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();

  isLoading = false;
  isSectionsAvailable = false;
  isMultiLevelSection = false;
  sections: any[] = [];
  isFirstSection = false;
  activeSection: any;
  contentError: contentErrorMessage;
  parentConfig = {
    loadScoreBoard: false,
    requiresSubmit: false,
    isFirstSection: false,
    isSectionsAvailable: false,
    isReplayed: false,
    contentName: '',
  };

  showEndPage = true;
  showFeedBack: boolean;
  endPageReached = false;
  isEndEventRaised = false;
  isSummaryEventRaised = false;
  showReplay = true;

  attempts: { max: number, current: number };
  mainProgressBar = [];
  loadScoreBoard = false;
  summary: {
    correct: 0,
    partial: 0,
    skipped: 0,
    wrong: 0
  };
  isDurationExpired = false;
  finalScore = 0;
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
  jumpToQuestion: any;

  constructor(public viewerService: ViewerService, private utilService: UtilService) { }

  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit(): void {
    if (typeof this.playerConfig === 'string') {
      try {
        this.playerConfig = JSON.parse(this.playerConfig);
      } catch (error) {
        console.error('Invalid playerConfig: ', error);
      }
    }
    this.isLoading = true;
    this.setConfig();
    this.initializeSections();
  }

  initializeSections() {
    const childMimeType = _.map(this.playerConfig.metadata.children, 'mimeType');
    this.parentConfig.isSectionsAvailable = this.isSectionsAvailable = childMimeType[0] === 'application/vnd.sunbird.questionset';

    if (this.isSectionsAvailable) {
      this.isMultiLevelSection = this.getMultilevelSection(this.playerConfig.metadata);

      if (this.isMultiLevelSection) {
        this.contentError = {
          messageHeader: 'Unable to load content',
          messageTitle: 'Multi level sections are not supported as of now'
        };
      } else {
        const children = this.playerConfig.metadata.children;

        this.sections = _.map(children, (child) => {
          let childNodes = child?.children.map(item => item.identifier) || [];
          if (child?.shuffle) {
            childNodes = _.shuffle(childNodes);
          }
          if (this.playerConfig.metadata.timeLimits) {
            child = {
              ...child,
              timeLimits: this.playerConfig.metadata.timeLimits,
              showTimer: this.playerConfig.metadata.showTimer
            };
          }
          return {
            ...this.playerConfig, metadata: { ...child, childNodes },
          };
        });

        this.setInitialScores();
        this.activeSection = _.cloneDeep(this.sections[0]);
        this.isFirstSection = true;
        this.isLoading = false;
      }
    } else {
      let { childNodes } = this.playerConfig.metadata;
      if (this.playerConfig.metadata?.shuffle) {
        childNodes = _.shuffle(childNodes);
      }
      childNodes.forEach((element, index) => {
        this.mainProgressBar.push({
          index: (index + 1), class: 'unattempted', value: undefined,
          score: 0,
        });
      });
      this.playerConfig.metadata.childNodes = childNodes;
      this.activeSection = _.cloneDeep(this.playerConfig);
      this.isLoading = false;
      this.isFirstSection = true;
    }
  }

  setConfig() {
    this.parentConfig.contentName = this.playerConfig.metadata?.name;
    this.parentConfig.requiresSubmit = this.playerConfig.metadata?.requiresSubmit?.toLowerCase() !== 'no';
    this.showEndPage = this.playerConfig.metadata?.showEndPage?.toLowerCase() !== 'no';
    this.showFeedBack = this.playerConfig.metadata?.showFeedback?.toLowerCase() !== 'no';
    this.sideMenuConfig = { ...this.sideMenuConfig, ...this.playerConfig.config.sideMenu };
    this.userName = this.playerConfig.context.userData.firstName + ' ' + this.playerConfig.context.userData.lastName;
    this.attempts = {
      max: this.playerConfig.metadata?.maxAttempts,
      current: this.playerConfig.metadata?.currentAttempt ? this.playerConfig.metadata.currentAttempt + 1 : 1
    };
    this.totalScore = this.playerConfig.metadata.maxScore;
    this.showReplay = _.get(this.attempts, 'current') >= _.get(this.attempts, 'max') ? false : true;
    if (typeof this.playerConfig.metadata?.timeLimits === 'string') {
      this.playerConfig.metadata.timeLimits = JSON.parse(this.playerConfig.metadata.timeLimits);
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
    if ((this.playerConfig.metadata?.maxAttempt - 1) === this.playerConfig.metadata?.currentAttempt) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, false, true));
    } else if (this.playerConfig.metadata?.currentAttempt >= this.playerConfig.metadata?.maxAttempt) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, true, false));
    }
  }

  getActiveSectionIndex() {
    return this.sections.findIndex(sec => sec.metadata?.identifier === this.activeSection.metadata?.identifier);
  }

  onShowScoreBoard(event) {
    if (this.parentConfig.isSectionsAvailable) {
      const activeSectionIndex = this.getActiveSectionIndex();
      this.updateSectionScore(activeSectionIndex);
    }
    this.loadScoreBoard = true;
  }

  onSectionEnd(event) {
    if (this.parentConfig.isSectionsAvailable) {
      const activeSectionIndex = this.getActiveSectionIndex();
      this.updateSectionScore(activeSectionIndex);
      this.setNextSection(event, activeSectionIndex);
    } else {
      this.prepareEnd(event);
    }
  }

  onPlayerEvent(event) {
    this.playerEvent.emit(event);
  }

  getSummaryObject() {
    const classObj = _.groupBy(this.mainProgressBar, 'class');
    this.summary = {
      skipped: _.get(classObj, 'skipped.length') || 0,
      correct: _.get(classObj, 'correct.length') || 0,
      wrong: _.get(classObj, 'wrong.length') || 0,
      partial: _.get(classObj, 'partial.length') || 0
    };
  }

  updateSectionScore(activeSectionIndex: number) {
    this.mainProgressBar[activeSectionIndex].score = this.mainProgressBar[activeSectionIndex].children
      .reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
  }

  setNextSection(event, activeSectionIndex: number) {
    this.summary = this.utilService.sumObjectsByKey(this.summary, event.summary);
    const isSectionFullyAttempted = event.summary.skipped === 0 &&
      (event.summary?.correct + event.summary?.wrong) === this.mainProgressBar[activeSectionIndex]?.children?.length;
    const isSectionPartiallyAttempted = event.summary.skipped > 0;

    if (event.isDurationEnded) {
      this.isDurationExpired = true;
      this.prepareEnd(event);
      return;
    }

    let nextSectionIndex = activeSectionIndex + 1;
    if (event.jumpToSection) {
      const sectionIndex = this.sections.findIndex(sec => sec.metadata?.identifier === event.jumpToSection);
      nextSectionIndex = sectionIndex > -1 ? sectionIndex : nextSectionIndex;
    }

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
    if (nextSectionIndex < this.sections.length) {
      this.activeSection = _.cloneDeep(this.sections[nextSectionIndex]);
    } else {
      this.prepareEnd(event);
    }
  }

  prepareEnd(event) {
    this.calculateScore();
    if (this.playerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
    if (this.parentConfig.requiresSubmit) {
      this.loadScoreBoard = true;
    } else {
      this.endPageReached = true;
      this.getSummaryObject();
      this.viewerService.raiseSummaryEvent(this.currentSlideIndex, this.endPageReached, this.finalScore, this.summary);
      this.raiseEndEvent(this.currentSlideIndex, 'endPage', this.finalScore);
      this.isSummaryEventRaised = true;
      this.isEndEventRaised = true;

    }
  }

  replayContent() {
    this.parentConfig.isReplayed = true;
    this.loadScoreBoard = false;
    this.endPageReached = false;
    this.isDurationExpired = false;
    this.isEndEventRaised = false;
    this.attempts.current = this.attempts.current + 1;
    this.showReplay = _.get(this.attempts, 'current') >= _.get(this.attempts, 'max') ? false : true;
    this.mainProgressBar = [];
    this.summary = {
      correct: 0,
      partial: 0,
      skipped: 0,
      wrong: 0
    };
    this.sections = [];
    this.initialTime = new Date().getTime();
    this.initializeSections();
    this.endPageReached = false;
    this.loadScoreBoard = false;
    this.currentSlideIndex = 1;
    this.activeSection = this.isSectionsAvailable ? _.cloneDeep(this.sections[0]) : this.playerConfig;
    if (this.attempts?.max === this.attempts?.current) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(_.get(this.attempts, 'current'), false, true));
    }
    this.viewerService.raiseHeartBeatEvent(eventName.replayClicked, TelemetryType.interact, 1);

    setTimeout(() => {
      this.parentConfig.isReplayed = false;
    }, 200);
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
  }

  calculateScore() {
    this.finalScore = this.mainProgressBar.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
    this.generateOutComeLabel();
    return this.finalScore;
  }

  exitContent(event) {
    this.calculateScore();
    if (event?.type === 'EXIT') {
      this.viewerService.raiseHeartBeatEvent(eventName.endPageExitClicked, TelemetryType.interact, 'endPage');
      this.getSummaryObject();
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
    if (this.playerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
  }

  onScoreBoardLoaded(event) {
    if (event?.scoreBoardLoaded) {
      this.calculateScore();
    }
  }

  onScoreBoardSubmitted() {
    this.getSummaryObject();
    if (this.playerConfig.metadata?.summaryType !== 'Score') {
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
    this.viewerService.raiseHeartBeatEvent(eventName.scoreBoardSubmitClicked, TelemetryType.interact, pageId.submitPage);
    this.viewerService.raiseSummaryEvent(this.currentSlideIndex, this.endPageReached, this.finalScore, this.summary);
    this.raiseEndEvent(this.currentSlideIndex, this.endPageReached, this.finalScore);
    this.loadScoreBoard = false;
    this.isSummaryEventRaised = true;
    this.endPageReached = true;
  }

  generateOutComeLabel() {
    this.outcomeLabel = this.finalScore.toString();
    switch (_.get(this.playerConfig, 'metadata.summaryType')) {
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

  goToQuestion(event) {
    if (this.parentConfig.isSectionsAvailable && event.identifier) {
      const sectionIndex = this.sections.findIndex(sec => sec.metadata?.identifier === event.identifier);
      this.activeSection = _.cloneDeep(this.sections[sectionIndex]);
      this.mainProgressBar.forEach((item, index) => {
        item.isActive = index === sectionIndex;
      });
    } else {
      this.jumpToQuestion = event;
    }
    this.loadScoreBoard = false;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.calculateScore();

    if (this.isSummaryEventRaised === false) {
      this.getSummaryObject();
      this.viewerService.raiseSummaryEvent(this.currentSlideIndex, this.endPageReached, this.finalScore, this.summary);
    }
    this.raiseEndEvent(this.currentSlideIndex, this.endPageReached, this.finalScore);
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

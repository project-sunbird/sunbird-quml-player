import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { contentErrorMessage } from '@project-sunbird/sunbird-player-sdk-v9/lib/player-utils/interfaces/errorMessage';
import { NextContent } from '@project-sunbird/sunbird-player-sdk-v9/sunbird-player-sdk.interface';
import * as _ from 'lodash-es';
import { IParentConfig, QumlPlayerConfig } from '../quml-library-interface';
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
  sectionIndex = 0;
  activeSection: any;
  contentError: contentErrorMessage;
  parentConfig: IParentConfig = {
    loadScoreBoard: false,
    requiresSubmit: false,
    isFirstSection: false,
    isSectionsAvailable: false,
    isReplayed: false,
    identifier: '',
    contentName: '',
    baseUrl: '',
    instructions: {},
    questionCount: 0,
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
  totalVisitedQuestion = 0;
  nextContent: NextContent;

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
    this.viewerService.sectionQuestions = [];
    if (this.isSectionsAvailable) {
      this.isMultiLevelSection = this.getMultilevelSection(this.playerConfig.metadata);

      if (this.isMultiLevelSection) {
        this.contentError = {
          messageHeader: 'Unable to load content',
          messageTitle: 'Multi level sections are not supported as of now'
        };
      } else {
        let children = this.playerConfig.metadata.children;
        this.sections = _.map(children, (child) => {
          let childNodes = child?.children?.map(item => item.identifier) || [];
          const maxQuestions = child?.maxQuestions;
          if (child?.shuffle && !this.playerConfig.config?.progressBar?.length) {
            childNodes = _.shuffle(childNodes);
          }

          if (maxQuestions) {
            childNodes = childNodes.slice(0, maxQuestions);
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
      let childNodes = [];
      if (this.playerConfig.metadata?.children?.length) {
        childNodes = this.playerConfig.metadata.children.map(item => item.identifier);
      } else {
        childNodes = this.playerConfig.metadata.childNodes;
      }

      const maxQuestions = this.playerConfig.metadata.maxQuestions;
      if (maxQuestions) {
        childNodes = childNodes.slice(0, maxQuestions);
      }
      if (this.playerConfig.metadata?.shuffle && !this.playerConfig.config?.progressBar?.length) {
        childNodes = _.shuffle(childNodes);
      }
      childNodes.forEach((element, index) => {
        this.totalNoOfQuestions++;
        this.mainProgressBar.push({
          index: (index + 1), class: 'unattempted', value: undefined,
          score: 0,
        });
      });
      this.playerConfig.metadata.childNodes = childNodes;
      if (this.playerConfig.config?.progressBar?.length) {
        this.mainProgressBar = _.cloneDeep(this.playerConfig.config.progressBar);
      }
      if (this.playerConfig.config?.questions?.length) {
        const questionsObj = this.playerConfig.config.questions.find(item => item.id === this.playerConfig.metadata.identifier);
        if (questionsObj?.questions) {
          this.viewerService.updateSectionQuestions(this.playerConfig.metadata.identifier, questionsObj.questions);
        }
      }
      this.activeSection = _.cloneDeep(this.playerConfig);
      this.isLoading = false;
      this.isFirstSection = true;
      this.parentConfig.questionCount = this.totalNoOfQuestions;
    }
  }

  setConfig() {
    this.parentConfig.contentName = this.playerConfig.metadata?.name;
    this.parentConfig.identifier = this.playerConfig.metadata?.identifier;
    this.parentConfig.requiresSubmit = this.playerConfig.metadata?.requiresSubmit?.toLowerCase() !== 'no';
    this.parentConfig.instructions = this.playerConfig.metadata?.instructions?.default;
    this.nextContent = this.playerConfig.config?.nextContent;
    this.showEndPage = this.playerConfig.metadata?.showEndPage?.toLowerCase() !== 'no';
    this.showFeedBack = this.playerConfig.metadata?.showFeedback?.toLowerCase() !== 'no';
    this.sideMenuConfig = { ...this.sideMenuConfig, ...this.playerConfig.config.sideMenu };
    this.userName = this.playerConfig.context.userData.firstName + ' ' + this.playerConfig.context.userData.lastName;

    if (this.playerConfig.metadata.isAvailableLocally && this.playerConfig.metadata.basePath) {
      this.parentConfig.baseUrl = this.playerConfig.metadata.basePath;
    }

    this.attempts = {
      max: this.playerConfig.metadata?.maxAttempt,
      current: this.playerConfig.metadata?.currentAttempt ? this.playerConfig.metadata.currentAttempt + 1 : 1
    };
    this.totalScore = this.playerConfig.metadata.maxScore;
    this.showReplay = this.attempts?.max && this.attempts?.current >= this.attempts.max ? false : true;
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
      this.isFirstSection = false;
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
    const progressBar = this.isSectionsAvailable ? _.flattenDeep(this.mainProgressBar.map(item => item.children)) : this.mainProgressBar;
    const classObj = _.groupBy(progressBar, 'class');
    this.summary = {
      skipped: _.get(classObj, 'skipped.length') || 0,
      correct: _.get(classObj, 'correct.length') || 0,
      wrong: _.get(classObj, 'wrong.length') || 0,
      partial: _.get(classObj, 'partial.length') || 0
    };
    this.totalVisitedQuestion = this.summary.correct + this.summary.wrong + this.summary.partial + this.summary.skipped;
    this.viewerService.totalNumberOfQuestions = this.totalNoOfQuestions;
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

    this.sectionIndex = _.cloneDeep(nextSectionIndex);
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
    this.setDurationSpent();
    if (this.parentConfig.requiresSubmit) {
      this.loadScoreBoard = true;
    } else {
      this.endPageReached = true;
      this.getSummaryObject();
      this.viewerService.raiseSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore, this.summary);
      this.raiseEndEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore);
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
    this.showReplay = this.attempts?.max && this.attempts?.current >= this.attempts.max ? false : true;
    this.totalNoOfQuestions = 0;
    this.totalVisitedQuestion = 0;
    this.mainProgressBar = [];
    this.jumpToQuestion = undefined;
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
    this.activeSection = this.isSectionsAvailable ? _.cloneDeep(this.sections[0]) : this.playerConfig;
    if (this.attempts?.max === this.attempts?.current) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(_.get(this.attempts, 'current'), false, true));
    }
    this.viewerService.raiseHeartBeatEvent(eventName.replayClicked, TelemetryType.interact, pageId.endPage);

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

    if (this.playerConfig.config?.questions?.length) {
      const questionsObj = this.playerConfig.config.questions.find(item => item.id === section.metadata?.identifier);
      if (questionsObj?.questions) {
        this.viewerService.updateSectionQuestions(section.metadata.identifier, questionsObj.questions);
      }
    }
    });
    if (this.playerConfig.config?.progressBar?.length) {
      this.mainProgressBar = _.cloneDeep(this.playerConfig.config.progressBar);
      this.mainProgressBar[0].isActive = true;
    }
    this.parentConfig.questionCount = this.totalNoOfQuestions;
  }

  calculateScore() {
    this.finalScore = this.mainProgressBar.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
    this.generateOutComeLabel();
    return this.finalScore;
  }

  exitContent(event) {
    this.calculateScore();
    if (event?.type === 'EXIT') {
      this.viewerService.raiseHeartBeatEvent(eventName.endPageExitClicked, TelemetryType.interact, pageId.endPage);
      this.getSummaryObject();
      this.viewerService.raiseSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore, this.summary);
      this.isSummaryEventRaised = true;
      this.raiseEndEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore);
    }
  }


  raiseEndEvent(currentQuestionIndex, endPageSeen, score) {
    if (this.isEndEventRaised) {
      return;
    }
    this.isEndEventRaised = true;
    this.viewerService.metaData.progressBar = this.mainProgressBar;
    this.viewerService.raiseEndEvent(currentQuestionIndex, endPageSeen, score);

    if (_.get(this.attempts, 'current') >= _.get(this.attempts, 'max')) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(_.get(this.attempts, 'current'), true, false));
    }
  }

  setDurationSpent() {
    if (this.playerConfig.metadata?.summaryType !== 'Score') {
      this.viewerService.metaData.duration = new Date().getTime() - this.initialTime;
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
  }

  onScoreBoardLoaded(event) {
    if (event?.scoreBoardLoaded) {
      this.calculateScore();
    }
  }

  onScoreBoardSubmitted() {
    this.endPageReached = true;
    this.getSummaryObject();
    this.setDurationSpent();
    this.viewerService.raiseHeartBeatEvent(eventName.scoreBoardSubmitClicked, TelemetryType.interact, pageId.submitPage);
    this.viewerService.raiseSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore, this.summary);
    this.raiseEndEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore);
    this.loadScoreBoard = false;
    this.isSummaryEventRaised = true;
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
    }
    this.jumpToQuestion = event;
    this.loadScoreBoard = false;
  }

  playNextContent(event) {
    this.viewerService.raiseHeartBeatEvent(event.type, TelemetryType.interact, pageId.endPage);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.calculateScore();
    this.getSummaryObject();
    if (this.isSummaryEventRaised === false) {
      this.viewerService.raiseSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore, this.summary);
    }
    this.raiseEndEvent(this.totalVisitedQuestion, this.endPageReached, this.finalScore);
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

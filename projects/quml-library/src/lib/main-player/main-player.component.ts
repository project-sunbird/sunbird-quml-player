import * as _ from 'lodash-es';

import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { contentErrorMessage } from '@project-sunbird/sunbird-player-sdk-v9/lib/player-utils/interfaces/errorMessage';
import { NextContent } from '@project-sunbird/sunbird-player-sdk-v9/sunbird-player-sdk.interface';
import { SectionPlayerComponent } from '../section-player/section-player.component';
import { IAttempts, IParentConfig, ISummary, QumlPlayerConfig } from './../quml-library-interface';
import { eventName, MimeType, pageId, TelemetryType } from './../telemetry-constants';

import { Event, EventType } from '../player/src/interfaces/Event';
import { Player } from "../player/src/Player";
import { TelemetryService } from '../player/src/TelemetryService';
import { PlayerService } from '../services/player.service';
import { ViewerService } from './../services/viewer-service/viewer-service';
import { UtilService } from './../util-service';

import { ISideBarEvent } from '@project-sunbird/sunbird-player-sdk-v9/sunbird-player-sdk.interface';
import maintain from 'ally.js/esm/maintain/_maintain';
import { fromEvent, Subscription } from 'rxjs';
import { QuestionCursor } from '../quml-question-cursor.service';
@Component({
  selector: "quml-main-player",
  templateUrl: "./main-player.component.html",
  styleUrls: ["./main-player.component.scss"],
})
export class MainPlayerComponent implements OnInit {
  @Input() playerConfig: QumlPlayerConfig;
  @Output() playerEvent = new EventEmitter<any>();
  @Output() telemetryEvent = new EventEmitter<any>();

  player: Player;
  @ViewChild(SectionPlayerComponent) sectionPlayer!: SectionPlayerComponent;

  isLoading = false;
  isMultiLevelSection = false;
  contentError: contentErrorMessage;
  parentConfig: IParentConfig = {
    loadScoreBoard: false,
    requiresSubmit: false,
    isSectionsAvailable: false,
    isReplayed: false,
    identifier: '',
    contentName: '',
    baseUrl: '',
    isAvailableLocally: false,
    instructions: {},
    questionCount: 0,
    sideMenuConfig: {
      enable: true,
      showShare: true,
      showDownload: false,
      showExit: false,
    },
    showFeedback: false,
    showLegend: true
  };

  showEndPage: boolean;
  showFeedBack: boolean;
  endPageReached = false;
  isEndEventRaised = false;
  isSummaryEventRaised = false;
  showReplay = true;

  attempts: IAttempts;
  loadScoreBoard = false;
  summary: ISummary = {
    correct: 0,
    partial: 0,
    skipped: 0,
    wrong: 0
  };
  isDurationExpired = false;
  totalNoOfQuestions = 0;
  durationSpent: string;
  totalScore: number;
  initialTime: number;
  userName: string;
  jumpToQuestion: any;
  totalVisitedQuestion = 0;
  nextContent: NextContent;
  telemetryService: TelemetryService;
  disabledHandle: any;
  subscription: Subscription;

  constructor(
    public viewerService: ViewerService,
    private utilService: UtilService,
    private playerService: PlayerService,
    private questionCursorImplementationService: QuestionCursor
  ) { }

  @HostListener("document:TelemetryEvent", ["$event"])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit(): void {
    this.player = this.playerService.getPlayerInstance();
    this.telemetryService = TelemetryService.getInstance(this.player);

    if (this.playerConfig) {
      this.player.questionCursorImplementationService = this.questionCursorImplementationService;
      this.player.setPlayerConfig(this.playerConfig);
      this.playerConfig = this.player.getPlayerConfig();
    } else {
      this.playerConfig = this.player.getPlayerConfig();
    }

    if (typeof this.playerConfig === "string") {
      try {
        this.playerConfig = JSON.parse(this.playerConfig);
      } catch (error) {
        console.error("Invalid playerConfig: ", error);
      }
    }
    this.isLoading = true;
    this.setConfig();
    this.initializeSections();
  }


  initializeSections() {
    const childMimeType = _.map(this.playerConfig.metadata.children, 'mimeType');
    this.parentConfig.isSectionsAvailable = childMimeType[0] === MimeType.questionSet;
    this.player.setRendererState({ singleParam: { paramName: "isSectionsAvailable", paramData: this.parentConfig.isSectionsAvailable } });
    this.parentConfig.metadata = { ...this.playerConfig.metadata };
    this.viewerService.sectionQuestions = [];
    if (this.parentConfig.isSectionsAvailable) {
      this.isMultiLevelSection = this.player.getMultilevelSection(this.playerConfig.metadata);

      if (this.isMultiLevelSection) {
        this.contentError = {
          messageHeader: "Unable to load content",
          messageTitle: "Multi level sections are not supported as of now",
        };
      } else {
        let children = this.playerConfig.metadata.children;
        const sections = _.map(children, (child) => {
          let childNodes =
            child?.children?.map((item) => item.identifier) || [];
          const maxQuestions = child?.maxQuestions;
          childNodes = child?.shuffle ? _.shuffle(childNodes) : childNodes;

          if (maxQuestions) {
            childNodes = childNodes.slice(0, maxQuestions);
          }

          if (this.playerConfig.metadata.timeLimits) {
            child = {
              ...child,
              timeLimits: this.playerConfig.metadata.timeLimits,
              showTimer: this.playerConfig.metadata.showTimer,
            };
          }
          return {
            ...this.playerConfig,
            metadata: { ...child, childNodes },
          };
        });

        this.player.setRendererState({ singleParam: { paramName: "sections", paramData: sections } });

        this.player.setInitialScores();
        this.parentConfig.questionCount = this.player.getRendererState().totalNoOfQuestions;
        this.player.setRendererState({ singleParam: { paramName: "activeSection", paramData: _.cloneDeep(sections[0]) } });
        this.isLoading = false;
      }
    } else {
      let childNodes = [];
      if (this.playerConfig.metadata?.children?.length) {
        childNodes = this.playerConfig.metadata.children.map(
          (item) => item.identifier
        );
      } else {
        childNodes = this.playerConfig.metadata.childNodes;
      }

      childNodes = this.playerConfig.metadata?.shuffle ? _.shuffle(childNodes) : childNodes;
      const maxQuestions = this.playerConfig.metadata.maxQuestions;
      /* istanbul ignore else */
      if (maxQuestions) {
        childNodes = childNodes.slice(0, maxQuestions);
      }
      let totalQuestions = this.player.getRendererState().totalNoOfQuestions;
      childNodes.forEach((element, index) => {
        totalQuestions++;
        const mainProgressBar = this.player.getRendererState().mainProgressBar;
        mainProgressBar.push({
          index: index + 1,
          class: "unattempted",
          value: undefined,
          score: 0,
        });
        this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: mainProgressBar } });
      });
      this.player.setRendererState({ singleParam: { paramName: "totalNoOfQuestions", paramData: totalQuestions } });
      this.playerConfig.metadata.childNodes = childNodes;
      if (!this.playerConfig.metadata?.shuffle) {
        if (this.playerConfig.config?.progressBar?.length) {
          this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: _.cloneDeep(this.playerConfig.config.progressBar) } });
        }
        if (this.playerConfig.config?.questions?.length) {
          const questionsObj = this.playerConfig.config.questions.find(
            (item) => item.id === this.playerConfig.metadata.identifier
          );
          if (questionsObj?.questions) {
            this.viewerService.updateSectionQuestions(
              this.playerConfig.metadata.identifier,
              questionsObj.questions
            );
          }
        }
      }
      this.player.setRendererState({ singleParam: { paramName: "activeSection", paramData: _.cloneDeep(this.playerConfig) } });
      this.isLoading = false;
      this.parentConfig.questionCount = this.player.getRendererState().totalNoOfQuestions;
    }
  }

  setConfig() {
    this.player.setRendererState({ singleParam: { paramName: "sections", paramData: [] } });
    this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: [] } });
    this.player.setRendererState({ singleParam: { paramName: "totalNoOfQuestions", paramData: 0 } });
    this.player.setRendererState({ singleParam: { paramName: "finalScore", paramData: 0 } });
    this.parentConfig.contentName = this.playerConfig.metadata?.name;
    this.parentConfig.identifier = this.playerConfig.metadata?.identifier;
    this.parentConfig.requiresSubmit = this.playerConfig.metadata?.requiresSubmit?.toLowerCase() !== 'no';
    this.parentConfig.instructions = this.playerConfig.metadata?.instructions?.default;
    this.parentConfig.showLegend = this.playerConfig.config?.showLegend !== undefined ? this.playerConfig.config.showLegend : true;
    this.nextContent = this.playerConfig.config?.nextContent;
    this.showEndPage = this.playerConfig.metadata?.showEndPage?.toLowerCase() !== 'no';
    this.parentConfig.showFeedback = this.showFeedBack = this.playerConfig.metadata?.showFeedback?.toLowerCase() === 'yes';
    this.parentConfig.sideMenuConfig = { ...this.parentConfig.sideMenuConfig, ...this.playerConfig.config.sideMenu };
    this.userName = this.playerConfig.context.userData.firstName + ' ' + this.playerConfig.context.userData.lastName;

    if (
      this.playerConfig.metadata.isAvailableLocally &&
      this.playerConfig.metadata.basePath
    ) {
      this.parentConfig.baseUrl = this.playerConfig.metadata.basePath;
      this.parentConfig.isAvailableLocally = true;
    }

    this.attempts = {
      max: this.playerConfig.metadata?.maxAttempts,
      current: this.playerConfig.metadata?.currentAttempt ? this.playerConfig.metadata.currentAttempt + 1 : 1
    };
    this.totalScore = this.playerConfig.metadata.maxScore;
    this.showReplay =
      this.attempts?.max && this.attempts?.current >= this.attempts.max
        ? false
        : true;
    if (typeof this.playerConfig.metadata?.timeLimits === "string") {
      this.playerConfig.metadata.timeLimits = JSON.parse(
        this.playerConfig.metadata.timeLimits
      );
    }
    this.initialTime = new Date().getTime();
    this.emitMaxAttemptEvents();
  }

  emitMaxAttemptEvents() {
    if ((this.playerConfig.metadata?.maxAttempts - 1) === this.playerConfig.metadata?.currentAttempt) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, false, true));
      this.player.emitMaxAttemptsExhausted(this.player.getRendererState());
    } else if (this.playerConfig.metadata?.currentAttempt >= this.playerConfig.metadata?.maxAttempts) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(this.attempts?.current, true, false));
      this.player.emitMaxAttemptsExhausted(this.player.getRendererState());
    }
  }

  onShowScoreBoard(event) {
    /* istanbul ignore else */
    if (this.parentConfig.isSectionsAvailable) {
      const activeSectionIndex = this.player.getActiveSectionIndex();
      this.player.updateSectionScore(activeSectionIndex);
    }
    this.getSummaryObject();
    this.loadScoreBoard = true;
  }

  onSectionEnd(event) {
    if (this.parentConfig.isSectionsAvailable) {
      const activeSectionIndex = this.player.getActiveSectionIndex();
      this.player.updateSectionScore(activeSectionIndex);
      this.setNextSection(event, activeSectionIndex);
    } else {
      this.prepareEnd(event);
    }
  }

  onPlayerEvent(event) {
    this.playerEvent.emit(event);
  }

  getSummaryObject() {
    const mainProgressBar = this.player.getRendererState().mainProgressBar;
    const progressBar = this.parentConfig.isSectionsAvailable
      ? _.flattenDeep(mainProgressBar.map((item) => item.children))
      : mainProgressBar;
    const classObj = _.groupBy(progressBar, "class");
    this.summary = {
      skipped: _.get(classObj, "skipped.length") || 0,
      correct: _.get(classObj, "correct.length") || 0,
      wrong: _.get(classObj, "wrong.length") || 0,
      partial: _.get(classObj, "partial.length") || 0,
    };
    this.totalVisitedQuestion =
      this.summary.correct +
      this.summary.wrong +
      this.summary.partial +
      this.summary.skipped;
    this.viewerService.totalNumberOfQuestions = this.player.getRendererState().totalNoOfQuestions;
  }

  setNextSection(event, activeSectionIndex: number) {
    const sections = this.player.getRendererState().sections;
    const mainProgressBar = this.player.getRendererState().mainProgressBar;
    this.summary = this.utilService.sumObjectsByKey(
      this.summary,
      event.summary
    );
    const isSectionFullyAttempted =
      event.summary.skipped === 0 &&
      event.summary?.correct + event.summary?.wrong === mainProgressBar[activeSectionIndex]?.children?.length;
    const isSectionPartiallyAttempted = event.summary.skipped > 0;

    if (event.isDurationEnded) {
      this.isDurationExpired = true;
      this.prepareEnd(event);
      return;
    }

    let nextSectionIndex = activeSectionIndex + 1;
    /* istanbul ignore else */
    if (event.jumpToSection) {
      const sectionIndex = sections.findIndex(
        (sec) => sec.metadata?.identifier === event.jumpToSection
      );
      nextSectionIndex = sectionIndex > -1 ? sectionIndex : nextSectionIndex;
    }

    this.player.setRendererState({ singleParam: { paramName: 'sectionIndex', paramData: nextSectionIndex } });
    mainProgressBar.forEach((item, index) => {
      item.isActive = index === nextSectionIndex;

      if (index === activeSectionIndex) {
        if (isSectionFullyAttempted) {
          item.class = "attempted";
        } else if (isSectionPartiallyAttempted) {
          item.class = "partial";
        }
      }
    });

    this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: mainProgressBar } });
    if (nextSectionIndex < sections.length) {
      this.player.setRendererState({ singleParam: { paramName: "activeSection", paramData: _.cloneDeep(sections[nextSectionIndex]) } });
    } else {
      this.prepareEnd(event);
    }
  }

  prepareEnd(event) {
    this.player.calculateScore();
    this.setDurationSpent();
    this.getSummaryObject();
    if (this.parentConfig.requiresSubmit && !this.isDurationExpired) {
      this.loadScoreBoard = true;
    } else {
      this.endPageReached = true;
      // this.viewerService.raiseSummaryEvent(
      //   this.totalVisitedQuestion,
      //   this.endPageReached,
      //   this.player.getRendererState().finalScore,
      //   this.summary
      // );
      this.telemetryService.emitSummaryEvent(
        this.totalVisitedQuestion,
        this.endPageReached,
        this.player.getRendererState().finalScore,
        this.summary,
        this.totalNoOfQuestions
      );
      this.raiseEndEvent(
        this.totalVisitedQuestion,
        this.endPageReached,
        this.player.getRendererState().finalScore
      );
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
    this.totalVisitedQuestion = 0;
    this.player.setRendererState({ singleParam: { paramName: "totalNoOfQuestions", paramData: 0 } });
    this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: [] } });
    this.jumpToQuestion = undefined;
    this.summary = {
      correct: 0,
      partial: 0,
      skipped: 0,
      wrong: 0,
    };
    this.player.setRendererState({ singleParam: { paramName: "sections", paramData: [] } });
    this.initialTime = new Date().getTime();
    this.initializeSections();
    this.endPageReached = false;
    this.loadScoreBoard = false;
    const activeSection = this.parentConfig.isSectionsAvailable ? _.cloneDeep(this.player.getRendererState().sections[0]) : this.playerConfig;
    this.player.setRendererState({ singleParam: { paramName: "activeSection", paramData: activeSection } });
    if (this.attempts?.max === this.attempts?.current) {
      this.playerEvent.emit(
        this.viewerService.generateMaxAttemptEvents(
          _.get(this.attempts, "current"),
          false,
          true
        )
      );
    }
    // this.viewerService.raiseHeartBeatEvent(eventName.replayClicked, TelemetryType.interact, pageId.endPage);
    this.telemetryService.emitHeartBeatEvent(eventName.replayClicked, TelemetryType.interact, pageId.endPage);

    setTimeout(() => {
      this.parentConfig.isReplayed = false;
      const element = document.querySelector('li.info-page') as HTMLElement;
      /* istanbul ignore else */
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }

  exitContent(event) {
    this.player.calculateScore();
    /* istanbul ignore else */
    if (event?.type === 'EXIT') {
      // this.viewerService.raiseHeartBeatEvent(eventName.endPageExitClicked, TelemetryType.interact, pageId.endPage);
      this.telemetryService.emitHeartBeatEvent(eventName.endPageExitClicked, TelemetryType.interact, pageId.endPage);
      this.getSummaryObject();
      // this.viewerService.raiseSummaryEvent(
      //   this.totalVisitedQuestion,
      //   this.endPageReached,
      //   this.player.getRendererState().finalScore,
      //   this.summary
      // );
      this.telemetryService.emitSummaryEvent(
        this.totalVisitedQuestion,
        this.endPageReached,
        this.player.getRendererState().finalScore,
        this.summary,
        this.totalNoOfQuestions
      );
      this.isSummaryEventRaised = true;
      this.raiseEndEvent(
        this.totalVisitedQuestion,
        this.endPageReached,
        this.player.getRendererState().finalScore
      );
    }
  }

  raiseEndEvent(currentQuestionIndex, endPageSeen, score) {
    if (this.isEndEventRaised) {
      return;
    }
    this.isEndEventRaised = true;
    this.viewerService.metaData.progressBar = this.player.getRendererState().mainProgressBar;
    // this.viewerService.raiseEndEvent(currentQuestionIndex, endPageSeen, score);
    this.telemetryService.emitEndEvent(currentQuestionIndex, endPageSeen, score, this.totalNoOfQuestions);

    /* istanbul ignore else */
    if (_.get(this.attempts, 'current') >= _.get(this.attempts, 'max')) {
      this.playerEvent.emit(this.viewerService.generateMaxAttemptEvents(_.get(this.attempts, 'current'), true, false));
    }
  }

  setDurationSpent() {
    /* istanbul ignore else */
    if (this.playerConfig.metadata?.summaryType !== 'Score') {
      this.viewerService.metaData.duration = new Date().getTime() - this.initialTime;
      this.durationSpent = this.utilService.getTimeSpentText(this.initialTime);
    }
  }

  onScoreBoardLoaded(event) {
    if (event?.scoreBoardLoaded) {
      this.player.calculateScore();
    }
  }

  onScoreBoardSubmitted() {
    this.endPageReached = true;
    this.getSummaryObject();
    this.setDurationSpent();
    // this.viewerService.raiseHeartBeatEvent(
    //   eventName.scoreBoardSubmitClicked,
    //   TelemetryType.interact,
    //   pageId.submitPage
    // );
    this.telemetryService.emitHeartBeatEvent(
      eventName.scoreBoardSubmitClicked,
      TelemetryType.interact,
      pageId.submitPage
    );
    // this.viewerService.raiseSummaryEvent(
    //   this.totalVisitedQuestion,
    //   this.endPageReached,
    //   this.player.getRendererState().finalScore,
    //   this.summary
    // );
    this.telemetryService.emitSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.player.getRendererState().finalScore,
      this.summary, this.totalNoOfQuestions);

    this.raiseEndEvent(
      this.totalVisitedQuestion,
      this.endPageReached,
      this.player.getRendererState().finalScore
    );
    const data = {
      totalVisitedQuestion: this.totalVisitedQuestion,
      endPageReached: this.endPageReached,
      finalScore: this.player.getRendererState().finalScore
    }
    const event = new Event(EventType.TELEMETRY, data, '', 0);
    this.player.sendTelemetryEvent(event);
    this.loadScoreBoard = false;
    this.isSummaryEventRaised = true;
  }

  goToQuestion(event) {
    /* istanbul ignore else */
    if (this.parentConfig.isSectionsAvailable && event.identifier) {
      const sections = this.player.getRendererState().sections;
      const sectionIndex = sections.findIndex(
        (sec) => sec.metadata?.identifier === event.identifier
      );
      this.player.setRendererState({ singleParam: { paramName: "activeSection", paramData: _.cloneDeep(sections[sectionIndex]) } });
      const mainProgressBar = this.player.getRendererState().mainProgressBar.forEach((item, index) => {
        item.isActive = index === sectionIndex;
      });
      this.player.setRendererState({ singleParam: { paramName: "mainProgressBar", paramData: mainProgressBar } });
    }
    this.jumpToQuestion = event;
    this.loadScoreBoard = false;
  }

  playNextContent(event) {
    // this.viewerService.raiseHeartBeatEvent(event?.type, TelemetryType.interact, pageId.endPage, event?.identifier);
    this.telemetryService.emitHeartBeatEvent(event?.type, TelemetryType.interact, pageId.endPage, event?.identifier);
  }

  toggleScreenRotate(event?: KeyboardEvent | MouseEvent) {
    this.telemetryService.emitHeartBeatEvent(eventName.deviceRotationClicked, TelemetryType.interact, this.sectionPlayer.myCarousel.getCurrentSlideIndex() + 1);
  }

  sideBarEvents(event: ISideBarEvent) {
    /* istanbul ignore else */
    if (event.type === 'OPEN_MENU' || event.type === 'CLOSE_MENU') {
      this.handleSideBarAccessibility(event);
    }
    this.telemetryService.emitHeartBeatEvent(event.type, TelemetryType.interact, this.sectionPlayer.myCarousel.getCurrentSlideIndex() + 1);
  }

  handleSideBarAccessibility(event) {
    const navBlock = document.querySelector('.navBlock') as HTMLInputElement;
    const overlayInput = document.querySelector('#overlay-input') as HTMLElement;
    const overlayButton = document.querySelector('#overlay-button') as HTMLElement;
    const sideBarList = document.querySelector('#sidebar-list') as HTMLElement;

    if (event.type === 'OPEN_MENU') {
      const isMobile = this.playerConfig.config?.sideMenu?.showExit;
      this.disabledHandle = isMobile ? maintain.hidden({ filter: [sideBarList, overlayButton, overlayInput] }) : maintain.tabFocus({ context: navBlock });
      this.subscription = fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
        console.log("===========", e.key);
        /* istanbul ignore else */
        if (e['key'] === 'Escape') {
          const inputChecked = document.getElementById('overlay-input') as HTMLInputElement;
          inputChecked.checked = false;
          document.getElementById('playerSideMenu').style.visibility = 'hidden';
          document.querySelector<HTMLElement>('.navBlock').style.marginLeft = '-100%';
          this.telemetryService.emitHeartBeatEvent('CLOSE_MENU', TelemetryType.interact, this.sectionPlayer.myCarousel.getCurrentSlideIndex() + 1);
          this.disabledHandle.disengage();
          this.subscription.unsubscribe();
          this.disabledHandle = null;
          this.subscription = null;
        }
      });
    } else if (event.type === 'CLOSE_MENU' && this.disabledHandle) {
      this.disabledHandle.disengage();
      this.disabledHandle = null;
      /* istanbul ignore else */
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.player.calculateScore();
    this.getSummaryObject();
    /* istanbul ignore else */
    if (this.isSummaryEventRaised === false) {
      // this.viewerService.raiseSummaryEvent(
      //   this.totalVisitedQuestion,
      //   this.endPageReached,
      //   this.player.getRendererState().finalScore,
      //   this.summary
      // );
      this.telemetryService.emitSummaryEvent(this.totalVisitedQuestion, this.endPageReached, this.player.getRendererState().finalScore,
        this.summary, this.totalNoOfQuestions
      )
    }
    /* istanbul ignore else */
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.raiseEndEvent(
      this.totalVisitedQuestion,
      this.endPageReached,
      this.player.getRendererState().finalScore
    );
  }
}

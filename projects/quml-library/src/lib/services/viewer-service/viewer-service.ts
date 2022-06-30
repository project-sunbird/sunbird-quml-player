import { EventEmitter, Injectable } from '@angular/core';
import { IParentConfig, QumlPlayerConfig } from '../../quml-library-interface';
import { QumlLibraryService } from '../../quml-library.service';
import { UtilService } from '../../util-service';
import { eventName } from '../../telemetry-constants';
import { PlayerQuestionCursor } from '../../player/src/question/PlayerQuestionCursor';
import * as _ from 'lodash-es';
import { forkJoin } from 'rxjs';
import { PlayerService } from '../player.service';
import { Player } from '../../player/src/Player';
import { Event, EventType, TelemetryType } from '../../player/src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  public qumlPlayerEvent = new EventEmitter<any>();
  public qumlQuestionEvent = new EventEmitter<any>();
  zoom: string;
  rotation: number;
  qumlPlayerStartTime: number;
  qumlPlayerLastPageTime: number;
  totalNumberOfQuestions: number;
  currentQuestionIndex: number;
  contentName: string;
  src: string;
  userName: string;
  version = '1.0';
  timeSpent = '0:0';
  metaData: any;
  loadingProgress: number;
  endPageSeen: boolean;
  identifiers: any;
  threshold: number;
  isAvailableLocally = false;
  isSectionsAvailable = false;
  questionSetId: string;
  parentIdentifier: string;
  sectionQuestions = [];
  player: Player;
  questionCursor: PlayerQuestionCursor;

  constructor(
    public qumlLibraryService: QumlLibraryService,
    public utilService: UtilService,
    public playerService: PlayerService
  ) {
    this.player = this.playerService.getPlayerInstance();
    this.listenToPlayerEvents();
    this.questionCursor = this.player.playerQuestionCursor;
  }

  initialize(config: QumlPlayerConfig, threshold: number, questionIds: string[], parentConfig: IParentConfig) {
    this.qumlLibraryService.initializeTelemetry(config, parentConfig);
    this.identifiers = _.cloneDeep(questionIds);
    this.parentIdentifier = config.metadata.identifier;
    this.threshold = threshold;
    this.rotation = 0;
    this.totalNumberOfQuestions = config.metadata.childNodes.length || 0;
    this.qumlPlayerStartTime = this.qumlPlayerLastPageTime = new Date().getTime();
    this.currentQuestionIndex = 1;
    this.contentName = config.metadata.name;
    this.isAvailableLocally = parentConfig.isAvailableLocally;
    this.isSectionsAvailable = parentConfig?.isSectionsAvailable;
    this.src = config.metadata.artifactUrl || '';
    this.questionSetId = config.metadata.identifier;

    /* istanbul ignore else */
    if (config.context.userData) {
      this.userName = config.context.userData.firstName + ' ' + config.context.userData.lastName;
    }
    this.metaData = {
      pagesHistory: [],
      totalPages: 0,
      duration: 0,
      rotation: [],
      progressBar: [],
      questions: [],
      questionIds: [],
      lastQuestionId: '',
    };
    this.loadingProgress = 0;
    this.endPageSeen = false;
  }

  listenToPlayerEvents() {
    this.player.emitter.subscribe((event) => {
      console.log('event', event);

      switch (event.type) {
        case EventType.HEARTBEAT:
          this.qumlPlayerEvent.emit(event.data);
        case EventType.TELEMETRY:
          this.raiseTelemetryEvent(event.data);
          break;
        default:
          console.error("Invalid Event Type");
      }
    });
  }

  raiseTelemetryEvent(event: any) {
    switch (event.eid) {
      case TelemetryType.START:
        this.qumlLibraryService.start(event.edata.duration);
        break;
      case TelemetryType.INTERACT:
        const { type, pageId } = event.edata;
        this.qumlLibraryService.interact(type, pageId);
        break;
      case TelemetryType.IMPRESSION:
        this.qumlLibraryService.impression(event.edata.pageId);
        break;
      case TelemetryType.ASSESS:
        this.qumlLibraryService.startAssesEvent(event.edata);
        break;
      case TelemetryType.RESPONSE:
        this.qumlLibraryService.response(event.edata);
        break;
      case TelemetryType.SUMMARY:
        this.qumlLibraryService.summary(event.edata);
        break;
      case TelemetryType.END:
        const { duration, currentPage, totalQuestions, endPageSeen, score } = event.edata;
        this.qumlLibraryService.end(duration, currentPage, totalQuestions, totalQuestions, endPageSeen, score);
        break;
      default: console.error("Invalid Telemetry Event Type");
    }
  }

  getQuestions(currentIndex?: number, index?: number) {
    let indentifersForQuestions;
    if (currentIndex !== undefined && index) {
      indentifersForQuestions = this.identifiers.splice(currentIndex, index);
    } else if (!currentIndex && !index) {
      indentifersForQuestions = this.identifiers.splice(0, this.threshold);
    }
    if (!_.isEmpty(indentifersForQuestions)) {
      const requests = [];
      const chunkArray = _.chunk(indentifersForQuestions, 10);
      _.forEach(chunkArray, (value) => {
        requests.push(this.questionCursor.getQuestions(value, this.parentIdentifier));
      });
      forkJoin(requests).subscribe(questions => {
        _.forEach(questions, (value) => {
          this.qumlQuestionEvent.emit(value);
        });
      }, (error) => {
        this.qumlQuestionEvent.emit({
          error: error
        })
      });
    }
  }

  getQuestion() {
    if (this.identifiers.length) {
      let questionIdentifier = this.identifiers.splice(0, this.threshold);
      this.questionCursor.getQuestion(questionIdentifier[0]).subscribe((question) => {
        this.qumlQuestionEvent.emit(question);
      }, (error) => {
        this.qumlQuestionEvent.emit({
          error: error
        });
      });
    }
  }

  generateMaxAttemptEvents(currentattempt: number, maxLimitExceeded: boolean, isLastAttempt: boolean) {
    return {
      eid: 'exdata',
      ver: this.version,
      edata: {
        type: 'exdata',
        currentattempt,
        maxLimitExceeded,
        isLastAttempt
      },
      metaData: this.metaData
    };
  }

  updateSectionQuestions(id: string, questions) {
    const index = this.sectionQuestions.findIndex(section => section.id === id);
    if (index > -1) {
      this.sectionQuestions[index].questions = questions;
    } else {
      this.sectionQuestions.push({ id, questions });
    }
  }

  getSectionQuestions(id: string) {
    return this.sectionQuestions.find(section => section.id === id)?.questions || [];
  }
}

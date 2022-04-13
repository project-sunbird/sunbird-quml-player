import { EventEmitter, Injectable } from '@angular/core';
import { IParentConfig, QumlPlayerConfig } from '../../quml-library-interface';
import { QumlLibraryService } from '../../quml-library.service';
import { UtilService } from '../../util-service';
import { eventName, TelemetryType } from '../../telemetry-constants';
import { QuestionCursor } from '../../quml-question-cursor.service';
import * as _ from 'lodash-es';
import { forkJoin } from 'rxjs';

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

  constructor(
    public qumlLibraryService: QumlLibraryService,
    public utilService: UtilService,
    public questionCursor: QuestionCursor
  ) { }

  initialize(config: QumlPlayerConfig , threshold: number, questionIds: string[], parentConfig: IParentConfig) {
    this.qumlLibraryService.initializeTelemetry(config, parentConfig);
    this.identifiers = _.cloneDeep(questionIds);
    this.parentIdentifier = config.metadata.identifier;
    this.threshold = threshold;
    this.rotation = 0;
    this.totalNumberOfQuestions = config.metadata.childNodes.length || 0;
    this.qumlPlayerStartTime = this.qumlPlayerLastPageTime = new Date().getTime();
    this.currentQuestionIndex = 1;
    this.contentName = config.metadata.name;
    this.isAvailableLocally = config.metadata.isAvailableLocally;
    this.isSectionsAvailable = parentConfig?.isSectionsAvailable;
    this.src = config.metadata.artifactUrl || '';
    this.questionSetId = config.metadata.identifier;

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

  raiseStartEvent(currentQuestionIndex) {
    this.currentQuestionIndex = currentQuestionIndex;
    const duration = new Date().getTime() - this.qumlPlayerStartTime;
    const startEvent: any = {
      eid: 'START',
      ver: this.version,
      edata: {
        type: 'START',
        currentIndex: this.currentQuestionIndex,
        duration
      },
      metaData: this.metaData
    };

    this.qumlPlayerEvent.emit(startEvent);
    this.qumlPlayerLastPageTime = this.qumlPlayerStartTime = new Date().getTime();
    this.qumlLibraryService.start(duration);
  }

  raiseEndEvent(currentQuestionIndex,  endPageSeen , score) {
    this.metaData.questions = this.sectionQuestions;
    const duration = new Date().getTime() - this.qumlPlayerStartTime;
    const endEvent: any = {
      eid: 'END',
      ver: this.version,
      edata: {
        type: 'END',
        currentPage: currentQuestionIndex,
        totalPages: this.totalNumberOfQuestions,
        duration
      },
      metaData: this.metaData
    };

    this.qumlPlayerEvent.emit(endEvent);
    const visitedlength = (this.metaData.pagesHistory.filter((v, i, a) => a.indexOf(v) === i)).length;
    this.timeSpent = this.utilService.getTimeSpentText(this.qumlPlayerStartTime);
    this.qumlLibraryService.end(duration, currentQuestionIndex, this.totalNumberOfQuestions, this.totalNumberOfQuestions, endPageSeen , score);
  }

  raiseHeartBeatEvent(type: string, telemetryType: string, pageId: any) {
    const hearBeatEvent: any = {
      eid: 'HEARTBEAT',
      ver: this.version,
      edata: {
        type,
        questionIndex: this.currentQuestionIndex,
      },
      metaData: this.metaData
    };

    if (this.isSectionsAvailable) {
      hearBeatEvent.edata.sectionId = this.questionSetId;
    }

    this.qumlPlayerEvent.emit(hearBeatEvent);
    if (TelemetryType.interact === telemetryType) {
      this.qumlLibraryService.interact(type.toLowerCase(), pageId);
    } else if (TelemetryType.impression === telemetryType) {
      this.qumlLibraryService.impression(pageId);
    }

  }

  raiseAssesEvent(questionData , index , pass , score , resValues , duration){
    const assessEvent = {
          item: questionData,
          index: index,
          pass: pass, 
          score: score, 
          resvalues: resValues, 
          duration: duration 
    }
    this.qumlPlayerEvent.emit(assessEvent);
    this.qumlLibraryService.startAssesEvent(assessEvent);
  }

  raiseResponseEvent(identifier , qType , optionSelected){
    const responseEvent = {
        target: {
          id: identifier,
          ver: this.version,
          type: qType
        },
        values: [{
          optionSelected
        }]
    }
    this.qumlPlayerEvent.emit(responseEvent);
    this.qumlLibraryService.response(identifier, this.version , qType , optionSelected);
  }

  raiseSummaryEvent(currentQuestionIndex, endpageseen, score, summaryObj) {
    let timespent = new Date().getTime() - this.qumlPlayerStartTime;
    timespent = Number(((timespent % 60000) / 1000).toFixed(2))
    const eData = {
      type: "content",
      mode: "play",
      starttime: this.qumlPlayerStartTime,
      endtime: new Date().getTime(),
      timespent,
      pageviews: this.totalNumberOfQuestions,
      interactions: summaryObj.correct + summaryObj.wrong + summaryObj.partial,
      extra: [{
        id: "progress",
        value: ((currentQuestionIndex / this.totalNumberOfQuestions) * 100).toFixed(0).toString()
      }, {
        id: "endpageseen",
        value: endpageseen.toString()
      }, {
        id: "score",
        value: score.toString()
      }, {
        id: "correct",
        value: summaryObj.correct.toString()
      }, {
        id: "incorrect",
        value: summaryObj.wrong.toString()
      }, {
        id: "partial",
        value: summaryObj.partial.toString()
      }, {
        id: "skipped",
        value: summaryObj.skipped.toString()
      }]
    };
    const summaryEvent = {
      eid: 'QUML_SUMMARY',
      ver: this.version,
      edata: eData,
      metaData: this.metaData
    };
    this.qumlPlayerEvent.emit(summaryEvent);
    this.qumlLibraryService.summary(eData);
  }

  raiseExceptionLog(errorCode: string , errorType: string , stacktrace , traceId ) {
    const exceptionLogEvent = {
      eid: "ERROR",
      edata: {
          err: errorCode,
          errtype: errorType,
          requestid: traceId || '',
          stacktrace: stacktrace || '',
      }
    }
    this.qumlPlayerEvent.emit(exceptionLogEvent)
    this.qumlLibraryService.error(stacktrace, { err: errorCode, errtype: errorType });
  }


  getQuestions(currentIndex?: number  , index?: number) {
    let indentifersForQuestions;
    if(currentIndex !== undefined && index) {
      indentifersForQuestions = this.identifiers.splice(currentIndex, index);
    }else if(!currentIndex && !index){
      indentifersForQuestions = this.identifiers.splice(0, this.threshold);
    }
    if(!_.isEmpty(indentifersForQuestions)) {
      const requests = [];
      const chunkArray = _.chunk(indentifersForQuestions, 10);
      _.forEach(chunkArray, (value) => {
        requests.push(this.questionCursor.getQuestions(value, this.parentIdentifier));
      });
      forkJoin(requests).subscribe(questions => {
        _.forEach(questions, (value) => {
          this.qumlQuestionEvent.emit(value);
        });
      },(error)=>{
          this.qumlQuestionEvent.emit({
            error: error
          })
      });
    }
  }

  getQuestion() {
    let indentiferForQuestion = this.identifiers.splice(0, this.threshold);
      this.questionCursor.getQuestion(indentiferForQuestion).subscribe((question) => {
        this.qumlQuestionEvent.emit(question);
      },(error)=>{
        this.qumlQuestionEvent.emit({
          error: error
        })
    })
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

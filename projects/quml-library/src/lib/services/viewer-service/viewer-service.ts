import { EventEmitter, Injectable } from '@angular/core';
import { QumlPlayerConfig } from '../../quml-library-interface';
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

  constructor(
    public qumlLibraryService: QumlLibraryService,
    public utilService: UtilService,
    public questionCursor: QuestionCursor
  ) {
  }

  initialize(config: QumlPlayerConfig , threshold, questionIds) {
    this.qumlLibraryService.initializeTelemetry(config);
    this.identifiers = questionIds;
    this.threshold = threshold;
    this.rotation = 0;
    this.totalNumberOfQuestions = config.metadata.childNodes.length || 0;
    this.qumlPlayerStartTime = this.qumlPlayerLastPageTime = new Date().getTime();
    this.currentQuestionIndex = 1;
    this.contentName = config.metadata.name;
    this.src = config.metadata.artifactUrl || '';
    if (config.context.userData) {
      this.userName = config.context.userData.firstName + ' ' + config.context.userData.lastName;
    }
    this.metaData = {
      pagesHistory: [],
      totalPages: 0,
      duration: [],
      zoom: [],
      rotation: []
    };
    this.loadingProgress = 0;
    this.endPageSeen = false;
  }

  raiseStartEvent(currentQuestionIndex) {
    this.currentQuestionIndex = currentQuestionIndex;
    const duration = new Date().getTime() - this.qumlPlayerStartTime;
    const startEvent = {
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

  raiseEndEvent(currentQuestionIndex, noOfvisitedQuestions,  endPageSeen , score) {
    const duration = new Date().getTime() - this.qumlPlayerStartTime;
    const endEvent = {
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
    this.qumlLibraryService.end(duration, currentQuestionIndex, this.totalNumberOfQuestions, noOfvisitedQuestions, endPageSeen , score);
  }


  raiseHeartBeatEvent(type: string, telemetryType: string, pageId: any) {
    const hearBeatEvent = {
      eid: 'HEARTBEAT',
      ver: this.version,
      edata: {
        type,
        questionIndex: this.currentQuestionIndex,
      },
      metaData: this.metaData
    };
    this.qumlPlayerEvent.emit(hearBeatEvent);
    if (TelemetryType.interact === telemetryType) {
      this.qumlLibraryService.interact(type.toLowerCase(), pageId);
    } else if (TelemetryType.impression === telemetryType) {
      this.qumlLibraryService.impression(pageId);
    }

  }
  
  raiseErrorEvent(error: Error) {
    const errorEvent = {
      eid: 'ERROR',
      ver: this.version,
      edata: {
        type: 'ERROR',
        stacktrace: error ? error.toString() : ''
      },
      metaData: this.metaData
    };
    this.qumlPlayerEvent.emit(errorEvent);
    this.qumlLibraryService.error(error);
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
        requests.push(this.questionCursor.getQuestions(value));
      });
      forkJoin(requests).subscribe(questions => {
        _.forEach(questions, (value) => {
          this.qumlQuestionEvent.emit(value);
        });
      });
    }
  }

  getQuestion() {
    let indentiferForQuestion = this.identifiers.splice(0, this.threshold);
      this.questionCursor.getQuestion(indentiferForQuestion).subscribe((question) => {
        this.qumlQuestionEvent.emit(question);
      })
  }

}

import { EventEmitter, Injectable } from '@angular/core';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { QumlPlayerConfig, Context } from './quml-library-interface';
import { UtilService } from './util-service';


@Injectable({
  providedIn: 'root'
})
export class QumlLibraryService {
  duration: number;
  channel: string;
  telemetryEvent = new EventEmitter<any>();
  private context: Context;
  private telemetryObject: any;
  private contentSessionId: string;
  private playSessionId: string;
  private pdata: any;
  private sid: string;
  private uid: string;
  private rollup: any;

  constructor(
    public utilService: UtilService
  ) {
  
  }

  initializeTelemetry(config: QumlPlayerConfig) {
    this.duration = new Date().getTime();
    this.context = config.context;
    this.contentSessionId = this.utilService.uniqueId();
    this.playSessionId = this.utilService.uniqueId();
    this.channel = this.context.channel || '';
    this.pdata = this.context.pdata;
    this.sid =  this.context.sid;
    this.uid =  this.context.uid;
    this.rollup = this.context.contextRollup;
    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({});
      CsTelemetryModule.instance.telemetryService.initTelemetry(
        {
          config: {
            pdata: this.context.pdata,
            env: 'ContentPlayer',
            channel: this.context.channel,
            did: this.context.did,
            authtoken: this.context.authToken || '',
            uid: this.context.uid || '',
            sid: this.context.sid,
            batchsize: 20,
            mode: this.context.mode,
            host: this.context.host || '',
            endpoint: this.context.endpoint || '/data/v3/telemetry',
            tags: this.context.tags,
            cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
            { id: this.playSessionId, type: 'PlaySession' }]
          },
          userOrgDetails: {}
        }
      );
    }

    this.telemetryObject = {
      id: config.metadata.identifier  || '',
      type: 'Content', 
      ver: config.metadata.pkgVersion ? config.metadata.pkgVersion.toString() : '',
      rollup: this.context.objectRollup || {}
    };
  }

  public startAssesEvent(assesEvent){
    CsTelemetryModule.instance.telemetryService.raiseAssesTelemetry(
        assesEvent,
        this.getEventOptions()
      );
  }

  public start(duration) {
    CsTelemetryModule.instance.telemetryService.raiseStartTelemetry(
      {
        options: this.getEventOptions(),
        edata: { type: 'content', mode: 'play', pageid: '', duration: Number((duration / 1e3).toFixed(2)) }
      }
    );
  }

  public response(identifier){
    const responseEvent = {
      target: {
        id: identifier,
        ver: '1.0',
        type: 'content'
      },
      type: 'content',
      values: []
    }
    CsTelemetryModule.instance.telemetryService.raiseResponseTelemetry(
      responseEvent, 
      this.getEventOptions()
    )
  }
  public end(duration, currentQuestionIndex, totalNoofQuestions, visitedQuestions, endpageseen , score) {
    const durationSec = Number((duration / 1e3).toFixed(2));
    CsTelemetryModule.instance.telemetryService.raiseEndTelemetry({
      edata: {
        type: 'content',
        mode: 'play',
        pageid: 'sunbird-player-Endpage',
        summary: [
          {
            progress: Number(((currentQuestionIndex / totalNoofQuestions) * 100).toFixed(0))
          },
          {
            totalNoofQuestions: totalNoofQuestions
          },
          {
            visitedQuestions: visitedQuestions,
          },
          {
            endpageseen
          },
          {
            score
          },
        ],
        duration: durationSec
      },
      options: this.getEventOptions()
    });
  }

  public interact(id, currentPage , currentQuestionDetails?) {
    CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
      options: this.getEventOptions(),
      edata: { type: 'TOUCH', subtype: '', id, pageid: currentPage + ''}
    });
  }



  public heartBeat(data) {
    CsTelemetryModule.instance.playerTelemetryService.onHeartBeatEvent(data, {});
  }

  public impression(currentPage) {
    CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry({
      options: this.getEventOptions(),
      edata: { type: 'workflow', subtype: '', pageid: currentPage + '', uri: '' }
    });
  }

  public error(error: Error) {
    CsTelemetryModule.instance.telemetryService.raiseErrorTelemetry({
      edata: {
        err: 'LOAD',
        errtype: 'content',
        stacktrace: (error && error.toString()) || ''
      }
    });
  }

  public getEventOptions() {
    return ({
      object: this.telemetryObject,
      context: {
        channel: this.channel || '',
        pdata: this.pdata,
        env: 'ContentPlayer',
        sid: this.sid,
        uid: this.uid,
        cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
        { id: this.playSessionId, type: 'PlaySession' }],
        rollup: this.rollup || {}
      }
    });
  }

}


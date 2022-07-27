import { eventName } from "../../telemetry-constants";
import { Event, EventType, TelemetryType } from "./interfaces";
import { Player } from "./Player";


export class TelemetryService {
  private player: Player;
  private version = '1.0'; // Default to 1.0
  private startTime: number = null;

  private static instance = null;

  constructor(player: Player) {
    this.player = player;
    TelemetryService.instance = this;
  }

  static getInstance(player: Player) {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService(player);
    }
    return TelemetryService.instance;
  }


  emitHeartBeatEvent(type: string, telemetryType: string, pageId: number | string, nextContentId?: string) {
    const hearBeatEvent: any = {
      eid: 'HEARTBEAT',
      ver: this.version,
      edata: {
        type,
        questionIndex: this.player.getRendererState().currentSlideIndex || 0,
      }
    };

    if (type === eventName.nextContentPlay && nextContentId) {
      hearBeatEvent.edata.nextContentId = nextContentId;
    }

    if (this.player.getRendererState().isSectionsAvailable) {
      hearBeatEvent.edata.sectionId = this.player.getRendererState().activeSection.metadata.identifier;
    }

    this.player.emitHearBeatEvent(hearBeatEvent);
    if (TelemetryType.INTERACT === telemetryType.toUpperCase()) {
      this.emitInteractEvent(type.toLowerCase(), pageId);
    } else if (TelemetryType.IMPRESSION === telemetryType.toUpperCase()) {
      this.emitImpressionEvent(pageId);
    }
  }

  emitStartEvent(questionIndex: number) {
    this.startTime = new Date().getTime();
    const startEvent: any = {
      eid: TelemetryType.START,
      ver: this.version,
      edata: {
        type: TelemetryType.START,
        currentIndex: questionIndex,
        duration: 0
      }
    };

    const event: Event = new Event(EventType.TELEMETRY, startEvent, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitInteractEvent(type: string, pageId: string | number) {
    const interact = {
      eid: TelemetryType.INTERACT,
      edata: {
        type: type.toLowerCase(),
        pageId
      }
    }
    const event: Event = new Event(EventType.TELEMETRY, interact, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitImpressionEvent(pageId: string | number) {
    const impression = {
      eid: TelemetryType.IMPRESSION,
      edata: {
        pageId
      }
    }

    const event: Event = new Event(EventType.TELEMETRY, impression, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitAssesEvent(question: any, index: number, pass: string, score: number, resValues: any[], duration: number) {
    const assess = {
      eid: TelemetryType.ASSESS,
      edata: {
        item: question,
        index,
        pass,
        score,
        duration,
        resvalues: resValues,
      }
    };
    const event: Event = new Event(EventType.TELEMETRY, assess, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitResponseEvent(identifier, qType, optionSelected) {
    const response = {
      eid: TelemetryType.RESPONSE,
      edata: {
        target: {
          id: identifier,
          ver: this.version,
          type: qType
        },
        type: 'CHOOSE',
        values: [{
          optionSelected
        }]
      }
    };
    const event: Event = new Event(EventType.TELEMETRY, response, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitErrorEvent(errorCode: string, errorType: string, stacktrace: any, traceId: string) {
    const errorEvent = {
      eid: TelemetryType.ERROR,
      edata: {
        err: errorCode,
        errtype: errorType,
        requestid: traceId || '',
        stacktrace: stacktrace || '',
      }
    }
    const event: Event = new Event(EventType.TELEMETRY, errorEvent, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitSummaryEvent(currentQuestionIndex: number, endPageSeen: boolean, score: number, summaryObj: any, totalQuestions: number) {
    let timeSpent = new Date().getTime() - this.startTime;
    timeSpent = Number(((timeSpent % 60000) / 1000).toFixed(2))
    const eData = {
      type: "content",
      mode: "play",
      starttime: this.startTime,
      endtime: new Date().getTime(),
      timeSpent,
      pageviews: totalQuestions,
      interactions: summaryObj.correct + summaryObj.wrong + summaryObj.partial,
      extra: [
        {
          id: "progress",
          value: ((currentQuestionIndex / totalQuestions) * 100).toFixed(0).toString()
        },
        {
          id: "endpageseen",
          value: endPageSeen.toString()
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
    const summary = {
      eid: 'SUMMARY',
      ver: this.version,
      edata: eData,
    };

    const event: Event = new Event(EventType.TELEMETRY, summary, '', 0);
    this.player.sendTelemetryEvent(event);
  }

  emitEndEvent(questionIndex: number, endPageSeen: boolean, score: number, totalQuestions: number) {
    const duration = new Date().getTime() - this.startTime;
    const end: any = {
      eid: TelemetryType.END,
      ver: this.version,
      edata: {
        type: TelemetryType.END,
        currentPage: questionIndex,
        totalPages: totalQuestions,
        duration,
        totalQuestions,
        endPageSeen,
        score
      }
    };
    const event: Event = new Event(EventType.TELEMETRY, end, '', 0);
    this.player.sendTelemetryEvent(event);
  }
}
import { User } from "./interfaces/User";
import { Event, EventType } from "./interfaces/Event";
import { EventAudit } from "./interfaces/EventAudit";
import { ScheduledEventEmitter } from "./interfaces/ScheduledEventEmitter";
import {
  Persistence,
  PersistenceResult,
  PersistenceStatus,
} from "./interfaces/Persistence";
import { QumlPlayerConfig, Question } from "./interfaces/PlayerConfig";
import { RendererState } from "./interfaces/RendererState";
import { QuestionIterator } from "./question/QuestionIterator";

class Player {
  user: User | null;
  collectionId: any;
  rendererId: string;

  private shouldEmit: boolean = false; //Renderer may no live when the player is live.
  private emitter: ScheduledEventEmitter<Event>;
  private eventBacklog: Event[] = [];
  private shouldPersist: boolean = false;
  private shouldHydrateFromPersistence: boolean;
  private Persistence: Persistence;

  private playerConfig: QumlPlayerConfig;
  private rendererState: RendererState | null;

  public questionIterator: QuestionIterator;

  constructor(
    questionSetURL: string,
    user: User,
    shouldEmit: boolean,
    collection: any,
    playerConfig: QumlPlayerConfig
  ) {
    // TODO: Download Collection
    // TODO: Initialize PlayerConfig
    // TODO: Initialize Renderer and Player with default values
    // TODO: Initialize Persistence if needed
  }

  // Question Iterator should allows for getting the next question and all questions (needed in the Angular player with ints all
  // sections this way)

  // State Related Methods

  getPlayerConfig(): QumlPlayerConfig {
    return this.playerConfig;
  }

  getRendererState(): RendererState {
    return this.rendererState;
  }

  private getDiff(oldState: RendererState, newState: RendererState): any {
    return {};
  }

  setRendererState(state: RendererState) {
    const diff = this.getDiff(this.rendererState, state)
    //emit events based on diff

    // update old state
    this.rendererState = state;
  }

  getPlayerState() {
    throw new Error("Method not implemented.");
  }

  setPlayerState(playerState: QumlPlayerConfig) {
    const diff = this.getDiff(this.rendererState, state)
    //emit events based on diff

    // update old state
    this.playerConfig = playerState;
  }

  async setRendererState(newState: RendererState) {
    this.rendererState = newState;
  }

  // Event Related Methods

  async udpateShouldEmit(shouldEmit: boolean) {
    this.shouldEmit = shouldEmit;
    await this.emitEventsFromBacklog();
  }

  async emit(event: Event, isScheduled: boolean = false, date?: Date) {
    // Emit event to server
    if (this.shouldEmit) {
      if (isScheduled) {
        this.emitter.scheduleEmit(event, date);
      } else {
        this.emitter.emit(event);
      }
    } else {
      this.eventBacklog.push(event);
    }
  }

  async emitEventsFromBacklog() {
    // Emit all events from backlog
    if (this.eventBacklog.length > 0) {
      for (const event of this.eventBacklog) {
        const date = event.shouldEmitAt;
        if (date) {
          this.emit(event, true, date);
        } else {
          this.emit(event);
        }
      }
    }
  }

  // Persistence Related Methods
  async persist(meta: any): Promise<PersistenceResult> {
    // Persist state
    if (this.shouldPersist) {
      return this.Persistence.persist(
        {
          renderState: this.getRendererState(),
          playerState: this.getPlayerState(),
        },
        meta
      );
    } else {
      return {
        initialQuery: {
          data: this.rendererState,
          meta: meta,
        },
        response: {
          error: "Persistence is not enabled",
          data: null,
        },
        status: PersistenceStatus.FAILURE,
      };
    }
  }

  hydrateFromPersistence() {
    // Hydrate state from Persistence
    if (this.shouldHydrateFromPersistence) {
      const state = this.Persistence.fetch().response.data;
      this.setRendererState(state.renderState);
      this.setPlayerState(state.playerState);
    }
  }



  sendTelemetryEvent(event: Event) {
    if (event.type === T) {
      this.emit()
    }
  }


  /**
   * Emit an event when the max attempts are exhausted
   * @param {RendererState} state - RendererState
   */
  emitMaxAttemptsExhausted(state: RendererState) {
    // this.rendererState.isMaxAttemptExhausted = true;
    const desc = 'Max attempts are exhausted';
    const event = new Event(EventType.MAX_ATTEMPT_EXCEEDED, {}, desc, 0);
    this.emit(event);
  }


  /**
   * Emit an event when the max time is exhausted
   * @param {RendererState} state - RendererState
   */
  emitMaxTimeExhausted(state: RendererState) {
    // this.rendererState.isDurationExpired = true;
    const desc = 'Max attempts are exhausted';
    const event = new Event(EventType.MAX_TIME_EXCEEDED, {}, desc, 0);
    this.emit(event);
  }

  /**
   * Emit an event when the warning time started
   * @param {RendererState} state - RendererState
   */
  emitShowWarningTime(state: RendererState) {
    // this.rendererState.showWarningTime = true;
    const desc = 'Warning time started';
    const event = new Event(EventType.SHOW_WARNING_TIME, {}, desc, 0);
    this.emit(event);
  }

/**
 * Emit an event when user answers the question and showFeedBack is ON for a question set
 * @param {RendererState} state - RendererState
 */
  emitShowFeedBack(state: RendererState) {
    // this.rendererState.showWarningTime = true;
    const desc = 'Show feedback popup';
    const data = {
      isCorrect: true
    }
    const event = new Event(EventType.SHOW_FEEDBACK, data, desc, 0);
    this.emit(event);
  }

/**
 * Emit an event when feedback popup closes, with the next question data
 * @param {RendererState} state - RendererState
 * @param {Question} question - Question
 */
  emitNavigateToNextQuestion(state: RendererState, question: Question) {
    const event = new Event(EventType.NAVIGATE_TO_NEXT_QUESTION, question, '', 0);
    this.emit(event);
  }

/**
 * Emit an event to the renderer to navigate to the next question
 * @param {RendererState} state - RendererState
 * @param {string} nextSection - The id of the next section.
 */
  emitSectionCompleted(state: RendererState, nextSection: string) {
    // this.rendererState.isSectionCompleted = true;
    const data = {
      activeSection: state.activeSection,
      nextSection: nextSection
    }
    const event = new Event(EventType.SECTION_COMPLETED, data, '', 0);
    this.emit(event);
    // this.rendererState.activeSection = this.rendererState.sections[this.rendererState.sectionIndex];
  }

/**
 * Emit an event to the renderer when the player crashed
 * @param {RendererState} state - RendererState
 */
  emitPlayerCrashed(state: RendererState) {
    const data = {
      crashType: '',
      error: '',
    }
    const event = new Event(EventType.PLAYER_CRASHED, data, '', 0);
    this.emit(event);
  }


/**
 * It emits an event to the renderer on internet connection lost
 * @param {RendererState} state - RendererState
 */
  emitInternetConnectionError(state: RendererState) {
    this.persist({});
    const data = {
      isConnected: false,
    }
    const event = new Event(EventType.INTERNET_CONNECTION_ERROR, data, '', 0);
    this.emit(event);
  }

/**
 * Emit an event when player is ready to exit
 * @param {RendererState} state - The state of the renderer.
 * @param {boolean} [isForcefulExit=false] - boolean to indicate forceful exit
 */
  emitExit(state: RendererState, isForcefulExit: boolean = false) {
    this.rendererState = state;
    const data = {
      isForcefulExit,
    }
    const event = new Event(EventType.PLAYER_EXIT, data, '', 0);
    this.emit(event);
  }


/**
 * Emit an event to the renderer
 * @param {RendererState} state - The current state of the renderer.
 * @param {string} error - The error message to be displayed.
 * @param {string} errorCode - The error code that will be used to identify the error.
 */
  emitContentError(state: RendererState, error: string, errorCode: string) {
    const data = {
      error,
      errorCode
    }
    const event = new Event(EventType.CONTENT_ERROR, {}, '', 0);
  }


  // Utility Methods
}

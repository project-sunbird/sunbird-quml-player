import { QuestionCursor } from "../../quml-question-cursor.service";
import { Event, EventType } from "./interfaces/Event";
import { Logger } from "./interfaces/Logger";
import {
  Persistence,
  PersistenceResult,
  PersistenceStatus
} from "./interfaces/Persistence";
import { Question, QumlPlayerConfig } from "./interfaces/PlayerConfig";
import { RendererState } from "./interfaces/RendererState";
import { ScheduledEventEmitter } from "./interfaces/ScheduledEventEmitter";
import { User } from "./interfaces/User";
import { PlayerQuestionCursor } from "./question/PlayerQuestionCursor";
import { QuestionIterator } from "./question/QuestionIterator";
import * as _ from 'lodash-es';

export class Player {
  user: User | null;
  collectionId: any;
  rendererId: string;
  private logger: Logger = new Logger();

  private shouldEmit: boolean = true; //Renderer may no live when the player is live.
  private eventBacklog: Event[] = [];
  private shouldPersist: boolean = false;
  private shouldHydrateFromPersistence: boolean;
  private Persistence: Persistence;

  private playerConfig: QumlPlayerConfig;
  private rendererState: RendererState | null;

  public emitter: ScheduledEventEmitter<Event> = new ScheduledEventEmitter<any>();
  public questionIterator: QuestionIterator;

  public questionCursorImplementationService: QuestionCursor;
  public playerQuestionCursor: PlayerQuestionCursor;

  constructor(
    questionSetURL?: string,
    user?: User,
    shouldEmit: boolean = true,
    collection?: any,
    playerConfig?: QumlPlayerConfig
  ) {
    // TODO: Download Collection
    // TODO: Initialize PlayerConfig
    // TODO: Initialize Renderer and Player with default values
    // TODO: Initialize Persistence if needed
    this.rendererState = {};
  }

  // Question Iterator should allows for getting the next question and all questions (needed in the Angular player with ints all
  // sections this way)

  // State Related Methods

  getPlayerConfig(): QumlPlayerConfig {
    return this.playerConfig;
  }

  setPlayerConfig(config: QumlPlayerConfig): void {
    this.playerConfig = config;
  }

  getRendererState(): RendererState {
    return this.rendererState;
  }

  private getDiff(oldState: RendererState, newState: RendererState): any {
    return {};
  }

  setRendererState({ state, singleParam }: { state?: RendererState, singleParam?: { paramName: string, paramData: any } } = {}) {
    if (singleParam) {
      this.rendererState[singleParam.paramName] = singleParam.paramData;
    } else {
      const diff = this.getDiff(this.rendererState, state)
      //emit events based on diff

      // update old state
      this.rendererState = state;
    }

  }

  getPlayerState() {
    throw new Error("Method not implemented.");
  }

  setPlayerState(playerState: QumlPlayerConfig) {
    this.playerConfig = playerState;
  }

  // Event Related Methods

  async updateShouldEmit(shouldEmit: boolean) {
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
        const currentTimestamp = Date.now();
        const shouldEmit: boolean = (currentTimestamp - event.createdAt) > event.shouldEmitAfterInMs;
        if (shouldEmit) {
          this.emit(event);
        } else {
          this.logger.logger.log(event.toString());
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
    if (event.type === EventType.TELEMETRY) {
      this.emit(event)
    }
  }


  /**
   * Emit an event when the max attempts are exhausted
   */
  emitMaxAttemptsExhausted(state: RendererState) {
    // this.rendererState.isMaxAttemptExhausted = true;
    const desc = 'Max attempts are exhausted';
    const event = new Event(EventType.MAX_ATTEMPT_EXCEEDED, {}, desc, 0);
    this.emit(event);
  }


  /**
   * Emit an event when the max time is exhausted
   */
  emitMaxTimeExhausted(state: RendererState) {
    // this.rendererState.isDurationExpired = true;
    const desc = 'Max attempts are exhausted';
    const event = new Event(EventType.MAX_TIME_EXCEEDED, {}, desc, 0);
    this.emit(event);
  }

  /**
   * Emit an event when the warning time started
   */
  emitShowWarningTime(state: RendererState) {
    // this.rendererState.showWarningTime = true;
    const desc = 'Warning time started';
    const event = new Event(EventType.SHOW_WARNING_TIME, {}, desc, 0);
    this.emit(event);
  }

  /**
   * Emit an event when user answers the question and showFeedBack is ON for a question set
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
   */
  emitNavigateToNextQuestion(state: RendererState, question: Question) {
    const event = new Event(EventType.NAVIGATE_TO_NEXT_QUESTION, question, '', 0);
    this.emit(event);
  }

  /**
   * Emit an event to the renderer to navigate to the next question
   * @param nextSection - The id of the next section.
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
   * @param state - The state of the renderer.
   * @param [isForcefulExit=false] - boolean to indicate forceful exit
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
   * @param  state - The current state of the renderer.
   * @param  error - The error message to be displayed.
   * @param  errorCode - The error code that will be used to identify the error.
   */
  emitContentError(state: RendererState, error: string, errorCode: string) {
    const data = {
      error,
      errorCode
    }
    const event = new Event(EventType.CONTENT_ERROR, {}, '', 0);
  }


  // Utility Methods

  sortQuestions() {
    if (this.getRendererState().questions.length && this.getRendererState().questionIds.length) {
      const ques = [];
      this.getRendererState().questionIds.forEach((questionId) => {
        const que = this.getRendererState().questions.find(question => question.identifier === questionId);
        if (que) {
          ques.push(que);
        }
      });
      this.setRendererState({ singleParam: { paramName: "questions", paramData: ques } });
    }
  }

  getSectionSummary() {
    const classObj = _.groupBy(this.getRendererState().progressBarClass, 'class');
    return {
      skipped: classObj?.skipped?.length || 0,
      correct: classObj?.correct?.length || 0,
      wrong: classObj?.wrong?.length || 0,
      partial: classObj?.partial?.length || 0
    };
  }

  getScore(currentIndex, key, isCorrectAnswer, selectedOption?) {
    if (isCorrectAnswer) {
      return this.getRendererState().questions[currentIndex].responseDeclaration[key].correctResponse.outcomes.SCORE ?
        this.getRendererState().questions[currentIndex].responseDeclaration[key].correctResponse.outcomes.SCORE :
        this.getRendererState().questions[currentIndex].responseDeclaration[key].maxScore || 1;
    } else {
      const selectedOptionValue = selectedOption.option.value;
      const mapping = this.getRendererState().questions[currentIndex].responseDeclaration.mapping;
      let score = 0;

      if (mapping) {
        mapping.forEach((val) => {
          if (selectedOptionValue === val.response) {
            score = val.outcomes.SCORE || 0;
            if (val.outcomes.SCORE) {
              const progressBarClass = this.getRendererState().progressBarClass;
              progressBarClass[currentIndex].class = 'partial';
              this.setRendererState({ singleParam: { paramName: "progressBarClass", paramData: progressBarClass } });
            }
          }
        });
      }
      return score;
    }
  }

  calculateSectionScore() {
    return this.getRendererState().progressBarClass.reduce((accumulator, element) => accumulator + element.score, 0);
  }

  setSkippedClass(index) {
    const progressBarClass = this.getRendererState().progressBarClass;
    if (progressBarClass && _.get(progressBarClass[index], 'class') === 'unattempted') {
      progressBarClass[index].class = 'skipped';
      this.setRendererState({ singleParam: { paramName: "progressBarClass", paramData: progressBarClass } });
    }
  }

  updateScoreBoard(showFeedback, index, classToBeUpdated, optionValue?, score?) {
    const progressBarClass = this.getRendererState().progressBarClass;
    progressBarClass.forEach((ele) => {
      if (ele.index - 1 === index) {
        ele.class = classToBeUpdated;
        ele.score = score ? score : 0;

        if (!showFeedback) {
          ele.value = optionValue;
        }
      }
    });
    this.setRendererState({ singleParam: { paramName: "progressBarClass", paramData: progressBarClass } });
  }
}

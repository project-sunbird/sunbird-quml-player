import { User } from "./interfaces/User";
import { Event } from "./interfaces/Event";
import { EventAudit } from "./interfaces/EventAudit";
import { ScheduledEventEmitter } from "./interfaces/ScheduledEventEmitter";
import {
  Persistance,
  PersistanceResult,
  PersistanceStatus,
} from "./interfaces/Persistance";

interface RendererState {
  isSectionsAvailable: boolean;
  isMultiLevelSection: boolean;
  sections: any;
  isFirstSection: boolean;
  sectionIndex: number;
  activeSection: any;
  contentError: Event;
  showEndPage: boolean;
  showFeedBack: boolean;
  endPageReached: boolean;
  isEndEventRaised: boolean;
  isSummaryEventRaised: boolean;

  attempts: { max: number; current: number };
  mainProgressBar: string[];
  loadScoreBoard: boolean;
  summary: {
    correct: number;
    partial: number;
    skipped: number;
    wrong: number;
  };
  isDurationExpired: boolean;
  finalScore: number;
  totalNoOfQuestions: number;
  durationSpent: string;
  outcomeLabel: string;
  totalScore: number;
  initialTime: number;
  userName: string;
  jumpToQuestion: any;
  totalVisitedQuestion: number;
}

class Player {
  user: User | null;
  collection: any;

  private shouldEmit: boolean = false;
  private emitter: ScheduledEventEmitter<Event>;
  private rendererState: RendererState | null;
  private eventBacklog: Event[] = [];
  private shouldPersist: boolean = false;
  private shouldHydrateFromPersistance: boolean;
  private persistance: Persistance;

  constructor(user: User, shouldEmit: boolean, collection: any) {
    // Download Collection
    // Initialize Renderer and Player with default values
  }

  // Relatedd to Questions

  // State Related Methods

  getRendererState(): RendererState {
    return this.rendererState;
  }

  getPlayerState() {
    throw new Error("Method not implemented.");
  }

  setPlayerState(playerState: any) {
    throw new Error("Method not implemented.");
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

  // Persistance Related Methods
  async persist(meta: any): Promise<PersistanceResult> {
    // Persist state
    if (this.shouldPersist) {
      return this.persistance.persist(
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
          error: "Persistance is not enabled",
          data: null,
        },
        status: PersistanceStatus.FAILURE,
      };
    }
  }

  hydrateFromPersistance() {
    // Hydrate state from persistance
    if (this.shouldHydrateFromPersistance) {
      const state = this.persistance.fetch().response.data;
      this.setRendererState(state.renderState);
      this.setPlayerState(state.playerState);
    }
  }
}

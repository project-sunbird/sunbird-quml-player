import { User } from "./interfaces/User";
import { Event } from "./interfaces/Event";
import { EventAudit } from "./interfaces/EventAudit";
import { ScheduledEventEmitter } from "./interfaces/ScheduledEventEmitter";
import {
  Persistence,
  PersistenceResult,
  PersistenceStatus,
} from "./interfaces/Persistence";
import { QumlPlayerConfig } from "./interfaces/PlayerConfig";
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

  private getDiff(): any {
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
    if(event.type === T) {
      this.emit()      
    }
  }

  // Utility Methods
}

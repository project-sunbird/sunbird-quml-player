enum EventState {
  CREATED,
  EMITTED,
}

// Immutable
export class EventAudit {
  event: Event;
  state: EventState;
  timestamp: Date;
}

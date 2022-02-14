enum EventType {
  TELEMETRY,
  ERROR,
  PERSITANCE,

  // TODO: List all events here and add them to the documentation
}

export class Event {
  type: EventType;
  data: any;
  description?: string;
  shouldEmitAt?: Date;

  // #Note: This is not added because this will allow for birectional state update which will reduce the debuggability.
  // callback?: (data: any) => any;
}

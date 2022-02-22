enum EventType {
  TELEMETRY,
  ERROR,
  PERSITANCE,

  // TODO: List all events here and add them to the documentation
}

export class Event {

  constructor(type: EventType, data: any, description: string, shouldEmitAfterInMs: number) {
    this.type = type;
    this.data = data;
    this.description = description;
    this.shouldEmitAfterInMs = shouldEmitAfterInMs;
  }

  type: EventType;
  data: any;
  description?: string;
  shouldEmitAfterInMs?: number; //time in milli

  // #Note: This is not added because this will allow for birectional state update which will reduce the debuggability.
  // callback?: (data: any) => any;
}


// ------------ TELEMETRY -------------
// INTERACT (Handled from Rendered itself), IMPRESSION (Handled from Rendered itself)
// TODO: ASSESS: 
// TODO: START (QuestionSet), END(QuestionSet), SUMMARY(End of Session)
// TODO: When (state change of Player State) to emit
const tp: TelemetryPacket = {};
const desc: string = "Describe the type of telemetry event";
new Event(EventType.TELEMETRY, tp, desc, 0);

// ---------- ERROR ------------------

// ---------- PERSITANCE ------------------


// emitMaxAttemptEvents

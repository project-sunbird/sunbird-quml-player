export enum EventType {
  TELEMETRY,
  ERROR,
  PERSISTANCE,
  MAX_ATTEMPT_EXCEEDED,
  MAX_TIME_EXCEEDED,
  SHOW_WARNING_TIME,
  SHOW_FEEDBACK,
  NAVIGATE_TO_NEXT_QUESTION,
  SECTION_COMPLETED,
  PLAYER_CRASHED,
  INTERNET_CONNECTION_ERROR,
  PLAYER_EXIT,
  CONTENT_ERROR,
}

export class Event {

  constructor(type: EventType, data: any, description: string, shouldEmitAfterInMs: number) {
    this.createdAt = Date.now();
    this.type = type;
    this.data = data;
    this.description = description;
    this.shouldEmitAfterInMs = shouldEmitAfterInMs;
  }

  toString(): string{
    return `Event: CreateAt - ${this.createdAt}; shouldEmitAfterInMs: ${this.shouldEmitAfterInMs}; Type: ${this.type}; Data: ${JSON.stringify(this.data)};`
  }

  createdAt: number;
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
// const tp: TelemetryPacket = {};
// const desc: string = "Describe the type of telemetry event";
// new Event(EventType.TELEMETRY, tp, desc, 0);

// ---------- ERROR ------------------

// ---------- PERSITANCE ------------------


// emitMaxAttemptEvents

// onMaxAttemptExhausted()  -- Need to calculate the score and jump to the end page
// onMaxTimeExhausted()  -- Need to calculate the score and jump to the end page
// onSectionCompleted(sectionId: string, nextSectionId: string)
// onPlayerCrashed/onInternetConnectionError
// onExit() -- Need to raise End/summary event before exiting the player


// Need some callbacks events for these actions

// onJumpToQuestion(questionId: string)
// onJumpToSection(sectionId: string)
// onHintClicked/onViewSolution(questionId: string)
// onQuestionSetReplay()

### Call Agenda

- Plan walkthough
- Estimate timelines

### Task List

- e2e Tests to be written for safe refactoring
  - Aything to do outside of existing Angular - Cypress??
- Design - Add Jira Ticket Here
- Phased Implementation - Create Github Issues; Assign tickets

### Design

- Define a core set of features that need to be extracted from the codebase.
  - QuestionSet, Sections iterator to get questions from any collection
  - State management
    - Player
    - User
  - Events Management - abstractions using Angular/core EventEmitter to store, mutate (when state is changed) and emit events.
    - Entry and Exit (Question Set, Section, Questions)
    - Telemetry
    - Hints
    - Attempts
    - Errors
    - Time Limits
  - Persistence Layer Interfaces

### Jira Ticket Ouputs

- Design Wiki
  - Background
  - Solution
  - Pseudo Code
- Review on Wednesday
- DC Review on Thursday Second Half

### State

- GetCurrentPlayerState
- Start with refactoring projects/quml-library/src/lib/main-player/main-player.component.ts
- Player State

  ```js
  isSectionsAvailable = false;
  isMultiLevelSection = false;
  sections: any[] = [];
  isFirstSection = false;
  sectionIndex = 0;
  activeSection: any;
  contentError: contentErrorMessage;
  showEndPage = true;
  showFeedBack: boolean;
  endPageReached = false;
  isEndEventRaised = false;
  isSummaryEventRaised = false;
  showReplay = true;

  attempts: { max: number, current: number };
  mainProgressBar = [];
  loadScoreBoard = false;
  summary: {
  correct: 0,
  partial: 0,
  skipped: 0,
  wrong: 0
  };
  isDurationExpired = false;
  finalScore = 0;
  totalNoOfQuestions = 0;
  durationSpent: string;
  outcomeLabel: string;
  totalScore: number;
  initialTime: number;
  userName: string;
  jumpToQuestion: any;
  totalVisitedQuestion = 0;
  ```

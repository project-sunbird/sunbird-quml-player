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

### Open Questions

- Should player allow for processign of events - example telemetry?

export interface RendererState {
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
  isMaxAttemptExhausted: boolean;
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

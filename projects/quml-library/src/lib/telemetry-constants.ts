export enum pageId  {
        startPage = 'START_PAGE',
        submitPage = 'SUBMIT_PAGE',
        endPage = 'END_PAGE',
        shortAnswer = 'SHORT_ANSWER'
}


export enum eventName {
    pageScrolled = 'PAGE_SCROLLED',
    viewHint = 'VIEW_HINT',
    showAnswer = 'SHOW_ANSWER_CLICKED',
    nextClicked = 'NEXT_CLICKED',
    prevClicked = 'PREV_CLICKED',
    progressBar = 'PROGRESSBAR_CLICKED',
    replayClicked = 'REPLAY_CLICKED',
    startPageLoaded = 'START_PAGE_LOADED',
    viewSolutionClicked= 'VIEW_SOLUTION_CLICKED',
    solutionClosed = 'SOLUTION_CLOSED',
    closedFeedBack = 'CLOSED_FEEDBACK',
    tryAgain = 'TRY_AGAIN',
    optionClicked = 'OPTION_CLICKED',
    scoreBoardSubmitClicked = 'SCORE_BOARD_SUBMIT_CLICKED',
    endPageExitClicked = 'EXIT',
    zoomClicked = 'ZOOM_CLICKED',
    zoomInClicked = 'ZOOM_IN_CLICKED',
    zoomOutClicked = 'ZOOM_OUT_CLICKED',
    zoomCloseClicked = 'ZOOM_CLOSE_CLICKED',
    goToQuestion = 'GO_TO_QUESTION'
}

export enum TelemetryType {
    interact = 'interact',
    impression = 'impression',
}

export enum pageId  {
        startPage = 'START_PAGE',
        submitPage = 'SUBMIT_PAGE',
        endPage = 'END_PAGE'
}


export enum eventName {
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
    endPageExitClicked = 'EXIT'

}

export enum TelemetryType {
    interact = 'Interact',
    impression = 'impression',
}

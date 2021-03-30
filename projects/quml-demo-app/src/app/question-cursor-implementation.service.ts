import { Injectable } from '@angular/core';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player';
import { Observable, of } from 'rxjs';

export class QuestionCursorImplementationService extends QuestionCursor {

  questions = [{"code":"f7dd8f74-1198-30d2-c98e-b7a0d4ed1d28","channel":"b00bc992ef25f1a9a8d63291e20efc8d","description":"sgfdh","language":["English"],"mimeType":"application/vnd.sunbird.question","media":[],"body":"<div class='question-body'><div class='mcq-title'><p>WHat is djsgh;</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>","templateId":"mcq-vertical","createdOn":"2021-03-19T12:19:14.981+0000","interactions":{"response1":{"type":"choice","options":[{"label":"<p>kjsdhf</p>","value":0},{"label":"<p>sdfkjb</p>","value":1}]}},"primaryCategory":"Multiple Choice Question","contentDisposition":"inline","lastUpdatedOn":"2021-03-19T12:22:59.120+0000","contentEncoding":"gzip","showSolutions":"No","allowAnonymousAccess":"Yes","identifier":"do_1132395528600043521632","lastStatusChangedOn":"2021-03-19T12:22:59.120+0000","audience":["Student"],"visibility":"Parent","showTimer":"No","author":"harish","solutions":[],"qType":"MCQ","languageCode":["en"],"version":1,"pkgVersion":1,"versionKey":"1616156354982","showFeedback":"No","license":"CC BY 4.0","prevState":"Draft","interactionTypes":["choice"],"framework":"NCFCOPY","answer":"0","compatibilityLevel":4,"name":"asfdsg","status":"Live"}]

  getQuestions(identifiers: string[]): Observable<any> {
    return of(this.questions);
  }
  getQuestion(identifier: string): Observable<any> {
    return of(this.questions[0])
  }
}

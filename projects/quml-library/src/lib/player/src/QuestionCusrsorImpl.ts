import { HttpClient } from "@angular/common/http";
import { PlayerQuestionCursor } from "./question/PlayerQuestionCursor";
import { Observable, of, throwError as observableThrowError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { QuestionCursor } from "../../quml-question-cursor.service";

export class PlayerQuestionCursorImplementationService implements PlayerQuestionCursor {
  questionCursorImplementationService: QuestionCursor;
  constructor(
    questionCursorImplementationService: QuestionCursor,
    public getQuestionsCallback: Function = () => { },
    public getQuestionCallback: Function = () => { }) {
    this.questionCursorImplementationService = questionCursorImplementationService;
  }

  getQuestions(identifiers: string[]): Observable<any> {
    this.getQuestionCallback();
    return this.questionCursorImplementationService.getQuestions(identifiers);
  }

  getQuestion(identifier: string): Observable<any> {
    this.getQuestionCallback();
    return this.questionCursorImplementationService.getQuestion(identifier);
  }

  getQuestionSet(identifier: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getAllQuestionSet(identifiers: string[]): Observable<any> {
    throw new Error("Method not implemented.");
  }
}

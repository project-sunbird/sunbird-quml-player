import { Observable } from "rxjs";
import { Question } from "../interfaces/PlayerConfig";
export abstract class PlayerQuestionCursor {
  abstract getQuestions(
    identifiers: string[],
    parentId?: string
  ): Observable<Question>;
  abstract getQuestion(identifier: string): Observable<Question>;
  abstract getQuestionSet(identifier: string): Observable<any>;
  abstract getAllQuestionSet(identifiers: string[]): Observable<any>;
}

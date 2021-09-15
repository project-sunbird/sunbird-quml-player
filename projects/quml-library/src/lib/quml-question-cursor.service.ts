import { Observable } from 'rxjs';
import { Question } from './quml-library-interface';


export abstract class QuestionCursor {

  abstract getQuestions(identifiers: string[], parentId?: string): Observable<Question>;
  abstract getQuestion(identifier: string): Observable<Question>;
  abstract getQuestionSet(identifier: string): Observable<any>;
  abstract getAllQuestionSet(identifiers: string[]): Observable<any>;

}
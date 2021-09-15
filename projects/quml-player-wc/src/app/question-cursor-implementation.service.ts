import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuestionCursor } from '../../../quml-library/src/lib/quml-question-cursor.service';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class QuestionCursorImplementationService implements QuestionCursor {
    listUrl; // Define this url to call list api in server
    constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
        const url = (document.defaultView as any).questionListUrl;
        this.listUrl = url ? url : this.listUrl;
    }

    getQuestions(identifiers: string[]): Observable<any> {
        if (this.listUrl) {
            const option: any = {
                url: this.listUrl,
                data: {
                    request: {
                        search: { identifier: identifiers }
                    }
                }
            };
            return this.post(option).pipe(map((data) => {
                return data.result;
            }));
        } else {
            return of({});
        }
    }

    getQuestion(identifier: string): Observable<any> {
        if (this.listUrl) {
            const option: any = {
                url: this.listUrl,
                data: {
                    request: {
                        search: { identifier: [identifier] }
                    }
                }
            };
            return this.post(option).pipe(map((data) => {
                return data.result;
            }));
        } else {
            return of({});
        }
    }

    getQuestionSet(identifier: string): Observable<any> {
        return of({});
    }

    private post(requestParam): Observable<any> {
        const httpOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        return this.http.post(requestParam.url, requestParam.data, httpOptions).pipe(
            mergeMap((data: any) => {
                if (data.responseCode !== 'OK') {
                    return observableThrowError(data);
                }
                return of(data);
            }));
    }

    getAllQuestionSet(identifiers: string[]) {
        return of({});
    }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuestionCursor } from '../../../quml-library/src/lib/quml-question-cursor.service';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class QuestionCursorImplementationService implements QuestionCursor {
    listUrl; // Define this url to call list api in server
    questionsArray = {
        'questions': [{
            'copyright': 'tn',
            'code': 'ff0ceb77-1718-3338-2a23-78bef44ab777',
            'subject': ['English'],
            'channel': '01269878797503692810',
            'responseDeclaration': {
                'response1': {
                    'maxScore': 1,
                    'cardinality': 'single',
                    'type': 'integer',
                    'correctResponse': {
                        'value': '1',
                        'outcomes': {
                            'SCORE': 1
                        }
                    }
                }
            },
            'language': ['English'],
            'medium': ['English'],
            'mimeType': 'application/vnd.sunbird.question',
            'media': [],
            'body': '<div class=\'question-body\'><div class=\'mcq-title\'><p>Which team has more youngers in the Ipl team?</p></div><div data-choice-interaction=\'response1\' class=\'mcq-vertical\'></div></div>',
            'editorState': {
                'options': [{
                    'answer': false,
                    'value': {
                        'body': '<p>RCB</p>',
                        'value': 0
                    }
                }, {
                    'answer': true,
                    'value': {
                        'body': '<p>Delhi Capital</p>',
                        'value': 1
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>CSK</p>',
                        'value': 2
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>MI</p>',
                        'value': 3
                    }
                }],
                'question': '<p>Which team has more youngers in the Ipl team?</p>'
            },
            'templateId': 'mcq-vertical',
            'createdOn': '2021-04-14T10:38:20.112+0000',
            'interactions': {
                'response1': {
                    'type': 'choice',
                    'options': [{
                        'label': '<p>RCB</p>',
                        'value': 0
                    }, {
                        'label': '<p>Delhi Capital</p>',
                        'value': 1
                    }, {
                        'label': '<p>CSK</p>',
                        'value': 2
                    }, {
                        'label': '<p>MI</p>',
                        'value': 3
                    }]
                }
            },
            'gradeLevel': ['Class 10'],
            'primaryCategory': 'Multiple Choice Question',
            'contentDisposition': 'inline',
            'lastUpdatedOn': '2021-04-14T11:24:21.349+0000',
            'contentEncoding': 'gzip',
            'showSolutions': 'No',
            'allowAnonymousAccess': 'Yes',
            'identifier': 'do_2132579057673175041129',
            'lastStatusChangedOn': '2021-04-14T11:24:21.349+0000',
            'audience': ['Student'],
            'visibility': 'Parent',
            'showTimer': 'No',
            'author': 'Adarsh',
            'solutions': [],
            'qType': 'MCQ',
            'languageCode': ['en'],
            'version': 1,
            'pkgVersion': 1,
            'versionKey': '1618396700115',
            'showFeedback': 'No',
            'license': 'CC BY-NC 4.0',
            'prevState': 'Draft',
            'interactionTypes': ['choice'],
            'framework': 'tn_k-12_5',
            'answer': '1',
            'compatibilityLevel': 4,
            'name': 'Question_54',
            'attributions': ['Tester'],
            'board': 'State (Tamil Nadu)',
            'status': 'Live'
        }, {
            'copyright': 'tn',
            'code': '88a45adb-77ff-3c88-f917-771a756ab7e8',
            'subject': ['English'],
            'channel': '01269878797503692810',
            'responseDeclaration': {
                'response1': {
                    'maxScore': 1,
                    'cardinality': 'single',
                    'type': 'integer',
                    'correctResponse': {
                        'value': '0',
                        'outcomes': {
                            'SCORE': 1
                        }
                    }
                }
            },
            'language': ['English'],
            'medium': ['English'],
            'mimeType': 'application/vnd.sunbird.question',
            'media': [{
                'id': 'do_2132578840348590081294',
                'type': 'image',
                'src': 'https://staging.sunbirded.org/assets/public/content/do_2132578840348590081294/artifact/do_2132578840348590081294_1618394049641_rcblogo.jpg'
            }, {
                'id': 'do_2132578841481379841295',
                'type': 'image',
                'src': 'https://staging.sunbirded.org/assets/public/content/do_2132578841481379841295/artifact/do_2132578841481379841295_1618394063598_delhicap.png'
            }, {
                'id': 'do_2132578842983055361296',
                'type': 'image',
                'src': 'https://staging.sunbirded.org/assets/public/content/do_2132578842983055361296/artifact/do_2132578842983055361296_1618394079569_17-kingsjpg.jpg'
            }, {
                'id': 'do_2132578844423290881297',
                'type': 'image',
                'src': 'https://staging.sunbirded.org/assets/public/content/do_2132578844423290881297/artifact/do_2132578844423290881297_1618394097137_csk.jpg'
            }],
            'body': '<div class=\'question-body\'><div class=\'mcq-title\'><p>Which the team score Highest total in the Ipl History</p></div><div data-choice-interaction=\'response1\' class=\'mcq-grid-split\'></div></div>',
            'editorState': {
                'options': [{
                    'answer': true,
                    'value': {
                        'body': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578840348590081294/artifact/do_2132578840348590081294_1618394049641_rcblogo.jpg" alt="do_2132578840348590081294" data-asset-variable="do_2132578840348590081294"></figure>',
                        'value': 0
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578841481379841295/artifact/do_2132578841481379841295_1618394063598_delhicap.png" alt="do_2132578841481379841295" data-asset-variable="do_2132578841481379841295"></figure>',
                        'value': 1
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578842983055361296/artifact/do_2132578842983055361296_1618394079569_17-kingsjpg.jpg" alt="do_2132578842983055361296" data-asset-variable="do_2132578842983055361296"></figure>',
                        'value': 2
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578844423290881297/artifact/do_2132578844423290881297_1618394097137_csk.jpg" alt="do_2132578844423290881297" data-asset-variable="do_2132578844423290881297"></figure>',
                        'value': 3
                    }
                }],
                'question': '<p>Which the team score Highest total in the Ipl History</p>'
            },
            'templateId': 'mcq-grid-split',
            'createdOn': '2021-04-14T09:55:32.718+0000',
            'interactions': {
                'response1': {
                    'type': 'choice',
                    'options': [{
                        'label': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578840348590081294/artifact/do_2132578840348590081294_1618394049641_rcblogo.jpg" alt="do_2132578840348590081294" data-asset-variable="do_2132578840348590081294"></figure>',
                        'value': 0
                    }, {
                        'label': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578841481379841295/artifact/do_2132578841481379841295_1618394063598_delhicap.png" alt="do_2132578841481379841295" data-asset-variable="do_2132578841481379841295"></figure>',
                        'value': 1
                    }, {
                        'label': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578842983055361296/artifact/do_2132578842983055361296_1618394079569_17-kingsjpg.jpg" alt="do_2132578842983055361296" data-asset-variable="do_2132578842983055361296"></figure>',
                        'value': 2
                    }, {
                        'label': '<figure class="image"><img src="https://staging.sunbirded.org/assets/public/content/do_2132578844423290881297/artifact/do_2132578844423290881297_1618394097137_csk.jpg" alt="do_2132578844423290881297" data-asset-variable="do_2132578844423290881297"></figure>',
                        'value': 3
                    }]
                }
            },
            'gradeLevel': ['Class 10'],
            'primaryCategory': 'Multiple Choice Question',
            'contentDisposition': 'inline',
            'lastUpdatedOn': '2021-04-14T11:24:20.840+0000',
            'contentEncoding': 'gzip',
            'showSolutions': 'No',
            'allowAnonymousAccess': 'Yes',
            'identifier': 'do_2132578847352258561103',
            'lastStatusChangedOn': '2021-04-14T11:24:20.840+0000',
            'audience': ['Student'],
            'visibility': 'Parent',
            'showTimer': 'No',
            'author': 'Adarsh',
            'solutions': [],
            'qType': 'MCQ',
            'languageCode': ['en'],
            'version': 1,
            'pkgVersion': 1,
            'versionKey': '1618394132721',
            'showFeedback': 'No',
            'license': 'CC BY-NC 4.0',
            'prevState': 'Draft',
            'interactionTypes': ['choice'],
            'framework': 'tn_k-12_5',
            'answer': '0',
            'compatibilityLevel': 4,
            'name': 'Question_44',
            'attributions': ['Tester'],
            'board': 'State (Tamil Nadu)',
            'status': 'Live'
        }, {
            'copyright': 'tn',
            'code': '57c6235e-0c6a-722b-c0ac-15c1b7f7a6d1',
            'subject': ['English'],
            'channel': '01269878797503692810',
            'responseDeclaration': {
                'response1': {
                    'maxScore': 1,
                    'cardinality': 'single',
                    'type': 'integer',
                    'correctResponse': {
                        'value': '3',
                        'outcomes': {
                            'SCORE': 1
                        }
                    }
                }
            },
            'language': ['English'],
            'medium': ['English'],
            'mimeType': 'application/vnd.sunbird.question',
            'media': [],
            'body': '<div class=\'question-body\'><div class=\'mcq-title\'><p>How many title\'s did the Dehli capitals won it?</p></div><div data-choice-interaction=\'response1\' class=\'mcq-grid-split\'></div></div>',
            'editorState': {
                'options': [{
                    'answer': false,
                    'value': {
                        'body': '<p>1</p>',
                        'value': 0
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>4</p>',
                        'value': 1
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>2</p>',
                        'value': 2
                    }
                }, {
                    'answer': true,
                    'value': {
                        'body': '<p>0</p>',
                        'value': 3
                    }
                }],
                'question': '<p>How many title\'s did the Dehli capitals won it?</p>'
            },
            'templateId': 'mcq-grid-split',
            'createdOn': '2021-04-14T10:30:46.255+0000',
            'interactions': {
                'response1': {
                    'type': 'choice',
                    'options': [{
                        'label': '<p>1</p>',
                        'value': 0
                    }, {
                        'label': '<p>4</p>',
                        'value': 1
                    }, {
                        'label': '<p>2</p>',
                        'value': 2
                    }, {
                        'label': '<p>0</p>',
                        'value': 3
                    }]
                }
            },
            'gradeLevel': ['Class 10'],
            'primaryCategory': 'Multiple Choice Question',
            'contentDisposition': 'inline',
            'lastUpdatedOn': '2021-04-14T11:24:21.292+0000',
            'contentEncoding': 'gzip',
            'showSolutions': 'No',
            'allowAnonymousAccess': 'Yes',
            'identifier': 'do_2132579020493209601127',
            'lastStatusChangedOn': '2021-04-14T11:24:21.292+0000',
            'audience': ['Student'],
            'visibility': 'Parent',
            'showTimer': 'No',
            'author': 'Adarsh',
            'solutions': [],
            'qType': 'MCQ',
            'languageCode': ['en'],
            'version': 1,
            'pkgVersion': 1,
            'versionKey': '1618396246259',
            'showFeedback': 'No',
            'license': 'CC BY-NC 4.0',
            'prevState': 'Draft',
            'interactionTypes': ['choice'],
            'framework': 'tn_k-12_5',
            'answer': '3',
            'compatibilityLevel': 4,
            'name': 'Question_53',
            'attributions': ['Tester'],
            'board': 'State (Tamil Nadu)',
            'status': 'Live'
        }, {
            'copyright': 'tn',
            'code': '90fe265a-a239-f9e3-1ef4-b739d1ab83f6',
            'subject': ['English'],
            'channel': '01269878797503692810',
            'responseDeclaration': {
                'response1': {
                    'maxScore': 1,
                    'cardinality': 'single',
                    'type': 'integer',
                    'correctResponse': {
                        'value': '3',
                        'outcomes': {
                            'SCORE': 1
                        }
                    }
                }
            },
            'language': ['English'],
            'medium': ['English'],
            'mimeType': 'application/vnd.sunbird.question',
            'media': [],
            'body': '<div class=\'question-body\'><div class=\'mcq-title\'><p>How many world cup did Adam Gilchrist played?</p></div><div data-choice-interaction=\'response1\' class=\'mcq-vertical\'></div></div>',
            'editorState': {
                'options': [{
                    'answer': false,
                    'value': {
                        'body': '<p>8</p>',
                        'value': 0
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>6</p>',
                        'value': 1
                    }
                }, {
                    'answer': false,
                    'value': {
                        'body': '<p>5</p>',
                        'value': 2
                    }
                }, {
                    'answer': true,
                    'value': {
                        'body': '<p>7</p>',
                        'value': 3
                    }
                }],
                'question': '<p>How many world cup did Adam Gilchrist played?</p>'
            },
            'templateId': 'mcq-vertical',
            'createdOn': '2021-04-14T11:02:31.011+0000',
            'interactions': {
                'response1': {
                    'type': 'choice',
                    'options': [{
                        'label': '<p>8</p>',
                        'value': 0
                    }, {
                        'label': '<p>6</p>',
                        'value': 1
                    }, {
                        'label': '<p>5</p>',
                        'value': 2
                    }, {
                        'label': '<p>7</p>',
                        'value': 3
                    }]
                }
            },
            'gradeLevel': ['Class 10'],
            'primaryCategory': 'Multiple Choice Question',
            'contentDisposition': 'inline',
            'lastUpdatedOn': '2021-04-14T11:24:21.034+0000',
            'contentEncoding': 'gzip',
            'showSolutions': 'No',
            'allowAnonymousAccess': 'Yes',
            'identifier': 'do_2132579176530821121147',
            'lastStatusChangedOn': '2021-04-14T11:24:21.034+0000',
            'audience': ['Student'],
            'visibility': 'Parent',
            'showTimer': 'No',
            'author': 'Adarsh',
            'solutions': [],
            'qType': 'MCQ',
            'languageCode': ['en'],
            'version': 1,
            'pkgVersion': 1,
            'versionKey': '1618398151014',
            'showFeedback': 'No',
            'license': 'CC BY-NC 4.0',
            'prevState': 'Draft',
            'interactionTypes': ['choice'],
            'framework': 'tn_k-12_5',
            'answer': '3',
            'compatibilityLevel': 4,
            'name': 'Question_63',
            'attributions': ['Tester'],
            'board': 'State (Tamil Nadu)',
            'status': 'Live'
        }],
        'count': 4
    };
    constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
        const url = (document.defaultView as any).questionListUrl;
        console.log('url', url);
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
            return of(this.questionsArray);
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
            return of(this.questionsArray[0]);
        }
    }

    getQuestionSet(identifier: string): Observable<any> {
        return of({})
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

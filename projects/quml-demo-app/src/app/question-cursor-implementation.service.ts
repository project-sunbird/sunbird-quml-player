import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v8';
import { Observable, of } from 'rxjs';

export class QuestionCursorImplementationService extends QuestionCursor {

  questionsArray = {
    questions: [
      {
          "code": "f66eafc3-3304-bd9e-7650-2a63799c426a",
          "channel": "b00bc992ef25f1a9a8d63291e20efc8d",
          "responseDeclaration": {
              "response1": {
                  "maxScore": 1,
                  "cardinality": "single",
                  "type": "integer",
                  "correctResponse": {
                      "value": "0",
                      "outcomes": {
                          "SCORE": 5
                      }
                  }
              },
              "mapping": [
                {
                  "response": 1,
                  "outcomes": {
                    "SCORE": 0.5
                  },
                  "caseSensitive": false
                }
              ]
          },
          "language": [
              "English"
          ],
          "mimeType": "application/vnd.sunbird.question",
          "media": [],
          "body": "<div class='question-body'><div class='mcq-title'><p>3+2</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
          "editorState": {
              "options": [
                  {
                      "answer": true,
                      "value": {
                          "body": "<p>5</p>",
                          "value": 0
                      }
                  },
                  {
                      "answer": false,
                      "value": {
                          "body": "<p>7</p>",
                          "value": 1
                      }
                  }
              ],
              "question": "<p>3+2</p>"
          },
          "templateId": "mcq-vertical",
          "createdOn": "2021-03-26T05:32:58.461+0000",
          "interactions": {
              "response1": {
                  "type": "choice",
                  "options": [
                      {
                          "label": "<p>5</p>",
                          "value": 0
                      },
                      {
                          "label": "<p>7</p>",
                          "value": 1
                      }
                  ]
              }
          },
          "primaryCategory": "Multiple Choice Question",
          "contentDisposition": "inline",
          "lastUpdatedOn": "2021-03-26T05:34:52.341+0000",
          "contentEncoding": "gzip",
          "showSolutions": "No",
          "allowAnonymousAccess": "Yes",
          "identifier": "do_1132443076891525121169",
          "lastStatusChangedOn": "2021-03-26T05:34:52.341+0000",
          "audience": [
              "Student"
          ],
          "visibility": "Parent",
          "showTimer": "No",
          "author": "Sourav",
          "solutions": [],
          "qType": "MCQ",
          "languageCode": [
              "en"
          ],
          "bloomsLevel": "remember",
          "version": 1,
          "pkgVersion": 1,
          "versionKey": "1616736778462",
          "showFeedback": "No",
          "license": "CC BY 4.0",
          "prevState": "Draft",
          "interactionTypes": [
              "choice"
          ],
          "framework": "NCFCOPY",
          "answer": "0",
          "compatibilityLevel": 4,
          "name": "Addition",
          "status": "Live"
      },
      {
          "code": "06161653-3703-2e68-d018-b6fe77eb1fd8",
          "channel": "b00bc992ef25f1a9a8d63291e20efc8d",
          "responseDeclaration": {
              "response1": {
                  "maxScore": 1,
                  "cardinality": "single",
                  "type": "integer",
                  "correctResponse": {
                      "value": "0",
                      "outcomes": {
                          "SCORE": 1
                      }
                  }
              }
          },
          "language": [
              "English"
          ],
          "mimeType": "application/vnd.sunbird.question",
          "media": [],
          "body": "<div class='question-body'><div class='mcq-title'><p>7-2</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
          "editorState": {
              "options": [
                  {
                      "answer": true,
                      "value": {
                          "body": "<p>5</p>",
                          "value": 0
                      }
                  },
                  {
                      "answer": false,
                      "value": {
                          "body": "<p>4</p>",
                          "value": 1
                      }
                  }
              ],
              "question": "<p>7-2</p>"
          },
          "templateId": "mcq-vertical",
          "createdOn": "2021-03-26T05:33:30.776+0000",
          "interactions": {
              "response1": {
                  "type": "choice",
                  "options": [
                      {
                          "label": "<p>5</p>",
                          "value": 0
                      },
                      {
                          "label": "<p>4</p>",
                          "value": 1
                      }
                  ]
              }
          },
          "primaryCategory": "Multiple Choice Question",
          "contentDisposition": "inline",
          "lastUpdatedOn": "2021-03-26T05:34:52.388+0000",
          "contentEncoding": "gzip",
          "showSolutions": "No",
          "allowAnonymousAccess": "Yes",
          "identifier": "do_1132443079538769921173",
          "lastStatusChangedOn": "2021-03-26T05:34:52.388+0000",
          "audience": [
              "Student"
          ],
          "visibility": "Parent",
          "showTimer": "No",
          "author": "Sourav",
          "solutions": [],
          "qType": "MCQ",
          "languageCode": [
              "en"
          ],
          "bloomsLevel": "remember",
          "version": 1,
          "pkgVersion": 1,
          "versionKey": "1616736810777",
          "showFeedback": "No",
          "license": "CC BY 4.0",
          "prevState": "Draft",
          "interactionTypes": [
              "choice"
          ],
          "framework": "NCFCOPY",
          "answer": "0",
          "compatibilityLevel": 4,
          "name": "Subsraction",
          "status": "Live"
      },
      {
          "code": "4f8ec677-e828-8eb9-528d-fba785dd9425",
          "channel": "b00bc992ef25f1a9a8d63291e20efc8d",
          "responseDeclaration": {
              "response1": {
                  "maxScore": 1,
                  "cardinality": "single",
                  "type": "integer",
                  "correctResponse": {
                      "value": "0",
                      "outcomes": {
                          "SCORE": 1
                      }
                  }
              }
          },
          "language": [
              "English"
          ],
          "mimeType": "application/vnd.sunbird.question",
          "media": [],
          "body": "<div class='question-body'><div class='mcq-title'><p>6/3</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
          "editorState": {
              "options": [
                  {
                      "answer": true,
                      "value": {
                          "body": "<p>2</p>",
                          "value": 0
                      }
                  },
                  {
                      "answer": false,
                      "value": {
                          "body": "<p>3</p>",
                          "value": 1
                      }
                  }
              ],
              "question": "<p>6/3</p>"
          },
          "templateId": "mcq-vertical",
          "createdOn": "2021-03-26T05:33:57.658+0000",
          "interactions": {
              "response1": {
                  "type": "choice",
                  "options": [
                      {
                          "label": "<p>2</p>",
                          "value": 0
                      },
                      {
                          "label": "<p>3</p>",
                          "value": 1
                      }
                  ]
              }
          },
          "primaryCategory": "Multiple Choice Question",
          "contentDisposition": "inline",
          "lastUpdatedOn": "2021-03-26T05:34:52.419+0000",
          "contentEncoding": "gzip",
          "showSolutions": "No",
          "allowAnonymousAccess": "Yes",
          "identifier": "do_1132443081740943361175",
          "lastStatusChangedOn": "2021-03-26T05:34:52.419+0000",
          "audience": [
              "Student"
          ],
          "visibility": "Parent",
          "showTimer": "No",
          "author": "Sourav",
          "solutions": [],
          "qType": "MCQ",
          "languageCode": [
              "en"
          ],
          "bloomsLevel": "remember",
          "version": 1,
          "pkgVersion": 1,
          "versionKey": "1616736837659",
          "showFeedback": "No",
          "license": "CC BY 4.0",
          "prevState": "Draft",
          "interactionTypes": [
              "choice"
          ],
          "framework": "NCFCOPY",
          "answer": "0",
          "compatibilityLevel": 4,
          "name": "Division",
          "status": "Live"
      },
      {
          "code": "e959aed3-da6b-d342-97d1-a236aaa17dcd",
          "channel": "b00bc992ef25f1a9a8d63291e20efc8d",
          "responseDeclaration": {
              "response1": {
                  "maxScore": 1,
                  "cardinality": "single",
                  "type": "integer",
                  "correctResponse": {
                      "value": "0",
                      "outcomes": {
                          "SCORE": 1
                      }
                  }
              }
          },
          "language": [
              "English"
          ],
          "mimeType": "application/vnd.sunbird.question",
          "media": [],
          "body": "<div class='question-body'><div class='mcq-title'><p>6*4</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
          "editorState": {
              "options": [
                  {
                      "answer": true,
                      "value": {
                          "body": "<p>24</p>",
                          "value": 0
                      }
                  },
                  {
                      "answer": false,
                      "value": {
                          "body": "<p>20</p>",
                          "value": 1
                      }
                  }
              ],
              "question": "<p>6*4</p>"
          },
          "templateId": "mcq-vertical",
          "createdOn": "2021-03-26T05:34:27.390+0000",
          "interactions": {
              "response1": {
                  "type": "choice",
                  "options": [
                      {
                          "label": "<p>24</p>",
                          "value": 0
                      },
                      {
                          "label": "<p>20</p>",
                          "value": 1
                      }
                  ]
              }
          },
          "primaryCategory": "Multiple Choice Question",
          "contentDisposition": "inline",
          "lastUpdatedOn": "2021-03-26T05:34:52.448+0000",
          "contentEncoding": "gzip",
          "showSolutions": "No",
          "allowAnonymousAccess": "Yes",
          "identifier": "do_1132443084176588801179",
          "lastStatusChangedOn": "2021-03-26T05:34:52.448+0000",
          "audience": [
              "Student"
          ],
          "visibility": "Parent",
          "showTimer": "No",
          "author": "Sourav",
          "solutions": [],
          "qType": "MCQ",
          "languageCode": [
              "en"
          ],
          "bloomsLevel": "remember",
          "version": 1,
          "pkgVersion": 1,
          "versionKey": "1616736867391",
          "showFeedback": "No",
          "license": "CC BY 4.0",
          "prevState": "Draft",
          "interactionTypes": [
              "choice"
          ],
          "framework": "NCFCOPY",
          "answer": "0",
          "compatibilityLevel": 4,
          "name": "Multiplication",
          "status": "Live"
      }
  ]
  };
  getQuestions(identifiers: string[]): Observable<any> {
    return of(this.questionsArray);
  }
  getQuestion(identifier: string): Observable<any> {
    return of(this.questionsArray[0])
  }
}

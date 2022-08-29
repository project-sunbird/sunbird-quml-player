import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { McqComponent } from './mcq.component';

describe('McqComponent', () => {
  let component: McqComponent;
  let fixture: ComponentFixture<McqComponent>;
  const question = {
    "copyright": "tn",
    "subject": [
      "English"
    ],
    "channel": "01269878797503692810",
    "downloadUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431640099225615/q2_1646040142399_do_21348431640099225615_1.ecar",
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
        },
        "mapping": []
      }
    },
    "language": [
      "English"
    ],
    "mimeType": "application/vnd.sunbird.question",
    "variants": {
      "full": {
        "ecarUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431640099225615/q2_1646040142399_do_21348431640099225615_1.ecar",
        "size": "2841"
      },
      "online": {
        "ecarUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431640099225615/q2_1646040142454_do_21348431640099225615_1_ONLINE.ecar",
        "size": "1368"
      }
    },
    "body": "<div class='question-body' tabindex='-1'><div class='mcq-title' tabindex='0'><p>Who is the richest person in the world?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
    "editorState": {
      "options": [
        {
          "answer": true,
          "value": {
            "body": "<p>Jeff Bezos</p>",
            "value": 0
          }
        },
        {
          "answer": false,
          "value": {
            "body": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(32,33,36);\">Bill Gates</span></p>",
            "value": 1
          }
        }
      ],
      "question": "<p>Who is the richest person in the world?</p>"
    },
    "templateId": "mcq-vertical",
    "objectType": "Question",
    "se_mediums": [
      "English"
    ],
    "gradeLevel": [
      "Class 4"
    ],
    "primaryCategory": "Multiple Choice Question",
    "contentEncoding": "gzip",
    "artifactUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431640099225615/do_21348431640099225615_1646040142347.zip",
    "se_gradeLevels": [
      "Class 4"
    ],
    "showSolutions": "No",
    "identifier": "do_21348431640099225615",
    "audience": [
      "Teacher"
    ],
    "visibility": "Parent",
    "showTimer": "No",
    "author": "Vivek",
    "solutions": [],
    "qType": "MCQ",
    "languageCode": [
      "en"
    ],
    "version": 1,
    "se_subjects": [
      "English"
    ],
    "license": "CC BY 4.0",
    "interactionTypes": [
      "choice"
    ],
    "name": "q2",
    "status": "Live",
    "code": "f588f3ef-cebe-ca9e-c75e-29b96c1d4223",
    "prevStatus": "Draft",
    "medium": [
      "English"
    ],
    "media": [],
    "createdOn": "2022-02-28T07:51:56.918+0000",
    "interactions": {
      "response1": {
        "type": "choice",
        "options": [
          {
            "label": "<p>Jeff Bezos</p>",
            "value": 0
          },
          {
            "label": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(32,33,36);\">Bill Gates</span></p>",
            "value": 1
          }
        ]
      },
      "validation": {
        "required": "Yes"
      }
    },
    "se_boards": [
      "State (Tamil Nadu)"
    ],
    "contentDisposition": "inline",
    "lastUpdatedOn": "2022-02-28T09:22:22.524+0000",
    "allowAnonymousAccess": "Yes",
    "lastStatusChangedOn": "2022-02-28T09:22:22.524+0000",
    "se_FWIds": [
      "tn_k-12_5"
    ],
    "pkgVersion": 1,
    "versionKey": "1646034716932",
    "showFeedback": "No",
    "framework": "tn_k-12_5",
    "answer": "0",
    "createdBy": "fca2925f-1eee-4654-9177-fece3fd6afc9",
    "compatibilityLevel": 4,
    "board": "State (Tamil Nadu)"
  }

  const options = [
    {
      "label": "<p>Jeff Bezos</p>",
      "url": "https://picsum.photos/200/300",
      "value": 0
    },
    {
      "label": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(32,33,36);\">Bill Gates</span></p>",
      "value": 1
    }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [McqComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqComponent);
    component = fixture.componentInstance;
    component.question = question;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set layout to IMAGEGRID', () => {
    component.question.templateId = 'mcq-horizontal';
    component.ngOnInit();
    expect(component.layout).toBe('IMAGEGRID');
  });
  it('should set layout to IMAGEQAGRID', () => {
    component.question.templateId = 'mcq-vertical-split';
    component.ngOnInit();
    expect(component.layout).toBe('IMAGEQAGRID');
  });
  it('should set layout to MULTIIMAGEGRID', () => {
    component.question.templateId = 'mcq-grid-split';
    component.ngOnInit();
    expect(component.layout).toBe('MULTIIMAGEGRID');
  });
  it('should not set any layout', () => {
    component.question.templateId = 'mcq';
    component.ngOnInit();
    expect(component.layout).toBeUndefined;
  });
  it('should return a element on view init', () => {
    spyOn(document, 'getElementsByClassName').and.returnValue([document.createElement('div')] as any);
    component.ngAfterViewInit();
    expect(document.getElementsByClassName).toHaveBeenCalled();
  });

  it('should init the options', () => {
    component.options = options;
    const domSanitizer = TestBed.inject(DomSanitizer);
    spyOn(domSanitizer, 'sanitize');
    component.initOptions();
    expect(domSanitizer.sanitize).toHaveBeenCalled();
    expect(component.mcqOptions.length).toEqual(4);
  });

  it('should call emit event on option selected', () => {
    spyOn(component.optionSelected, 'emit');
    component.getSelectedOptionAndResult({ title: 'option 1', selected: true });
    expect(component.optionSelected.emit).toHaveBeenCalled();
  });

  it('should show the popup', () => {
    component.showQumlPopup = true;
    component.showPopup();
    component.showQumlPopup = false;
  });

  it('should close the popup', () => {
    component.showQumlPopup = true;
    component.closePopUp();
    component.showQumlPopup = false;
  });
  it('should not set solutions', () => {
    component.question.solutions = undefined;
    component.ngOnInit();
    expect(component.solutions).toEqual([]);
  });

  it('should call replaceLatexText', () => {
    component.identifier = 'do_123';
    const element = document.createElement('div');
    const mathElement = document.createElement('div');
    mathElement.classList.add('mathText');
    element.appendChild(mathElement);
    spyOn(document, 'getElementById').and.returnValue(element);
    spyOn(document, 'getElementsByClassName').and.returnValue([element] as any);
    // @ts-ignore
    window.katex = {
      render: () => { }
    }
    spyOn((window as any).katex, 'render');
    component.replaceLatexText();
    expect(document.getElementById).toHaveBeenCalled();
    expect((window as any).katex.render).toHaveBeenCalled();
  });
});

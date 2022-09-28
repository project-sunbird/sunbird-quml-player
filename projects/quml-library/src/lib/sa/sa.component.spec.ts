import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { SaComponent } from './sa.component';

describe('SaComponent', () => {
  let component: SaComponent;
  let fixture: ComponentFixture<SaComponent>;
  const questions = {
    "copyright": "tn",
    "subject": [
      "English"
    ],
    "channel": "01269878797503692810",
    "downloadUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431719053721619/q1_1646040142839_do_21348431719053721619_1.ecar",
    "responseDeclaration": {
      "response1": {
        "type": "string"
      }
    },
    "language": [
      "English"
    ],
    "mimeType": "application/vnd.sunbird.question",
    "variants": {
      "full": {
        "ecarUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431719053721619/q1_1646040142839_do_21348431719053721619_1.ecar",
        "size": "2635"
      },
      "online": {
        "ecarUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431719053721619/q1_1646040142898_do_21348431719053721619_1_ONLINE.ecar",
        "size": "1261"
      }
    },
    "body": "<p>What is lorem ipsum?</p>",
    "editorState": {
      "answer": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</span></p>",
      "question": "<p>What is lorem ipsum?</p>"
    },
    "objectType": "Question",
    "se_mediums": [
      "English"
    ],
    "gradeLevel": [
      "Class 4"
    ],
    "primaryCategory": "Subjective Question",
    "contentEncoding": "gzip",
    "artifactUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/question/do_21348431719053721619/do_21348431719053721619_1646040142794.zip",
    "se_gradeLevels": [
      "Class 4"
    ],
    "showSolutions": "Yes",
    "identifier": "do_21348431719053721619",
    "audience": [
      "Teacher"
    ],
    "visibility": "Parent",
    "showTimer": "No",
    "author": "Vivek",
    "solutions": [{
      type: 'image',
      value: 'do_123456789',
      src: 'images/logo.png'
    }],
    "qType": "SA",
    "languageCode": [
      "en"
    ],
    "version": 1,
    "se_subjects": [
      "English"
    ],
    "license": "CC BY 4.0",
    "name": "q1",
    "status": "Live",
    "code": "865c8214-c14a-0420-fffc-3487e4908606",
    "prevStatus": "Draft",
    "medium": [
      "English"
    ],
    "media": [{
      id: 'do_123456789',
      baseUrl: 'http://staging.sunbirded.org/',
      thumbnail: 'http://staging.sunbirded.org/images/do_1232/thumbnail.png',
    }],
    "createdOn": "2022-02-28T07:53:33.298+0000",
    "interactions": {
      "validation": {
        "required": "Yes"
      }
    },
    "se_boards": [
      "State (Tamil Nadu)"
    ],
    "contentDisposition": "inline",
    "lastUpdatedOn": "2022-02-28T09:22:22.950+0000",
    "allowAnonymousAccess": "Yes",
    "lastStatusChangedOn": "2022-02-28T09:22:22.950+0000",
    "se_FWIds": [
      "tn_k-12_5"
    ],
    "pkgVersion": 1,
    "versionKey": "1646034813428",
    "showFeedback": "No",
    "framework": "tn_k-12_5",
    "answer": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</span></p>",
    "createdBy": "fca2925f-1eee-4654-9177-fece3fd6afc9",
    "compatibilityLevel": 4,
    "board": "State (Tamil Nadu)"
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with proper data', () => {
    component.questions = questions;
    component.ngOnInit();
    expect(component.question).toEqual('<p>What is lorem ipsum?</p>');
    expect(component.answer).toEqual('<p><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</span></p>');
  });

  it('should initialize the component with proper data for local database', () => {
    component.questions = questions;
    component.baseUrl = 'http://localhost:3000/';
    component.ngOnInit();
    expect(component.question).toEqual('<p>What is lorem ipsum?</p>');
    expect(component.answer).toEqual('<p><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</span></p>');
  });


  it('should toggle the answer based on changes, for replayed content', () => {
    component.replayed = true;
    component.ngOnChanges();
    expect(component.showAnswer).toBe(false);
  });

  it('should toggle the answer based on changes', () => {
    component.replayed = false;
    component.questions = { isAnswerShown: true }
    component.ngOnChanges();
    expect(component.showAnswer).toBe(true);
  });

  it('should emit the event show answer clicked', () => {
    component.showAnswer = false;
    spyOn(component.showAnswerClicked, 'emit');
    component.showAnswerToUser();
    expect(component.showAnswer).toBe(true);
    expect(component.showAnswerClicked.emit).toHaveBeenCalledWith({ showAnswer: true });
  });

  it('should handle keyboard enter event, and show answer to use on enter', () => {
    const event = {
      keyCode: 13,
      stopPropagation: () => { },
    }
    spyOn(event, 'stopPropagation');
    spyOn(component, 'showAnswerToUser');
    component.onEnter(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.showAnswerToUser).toHaveBeenCalled();
  });

  it('should handle Accessibility, on view init', () => {
    spyOn(component, 'handleKeyboardAccessibility');
    component.ngAfterViewInit();
    expect(component.handleKeyboardAccessibility).toHaveBeenCalled();
  });

  it('should handle keyboard accessibility', () => {
    const optionBody = document.createElement('div');
    const anchor = document.createElement('a');
    optionBody.classList.add('option-body');
    optionBody.style.height = '100px';
    optionBody.appendChild(anchor);
    document.getElementsByClassName = jasmine.createSpy('getElementsByClassName').and.returnValue([optionBody]);
    spyOn(component, 'handleKeyboardAccessibility');
    component.handleKeyboardAccessibility();
    expect(component.handleKeyboardAccessibility).toHaveBeenCalled();
  });
});

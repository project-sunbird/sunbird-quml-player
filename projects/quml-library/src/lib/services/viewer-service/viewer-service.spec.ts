import { inject, TestBed } from '@angular/core/testing';
import { ViewerService } from './viewer-service';
import { mockData } from './viewer-service.data';
import { QumlLibraryService } from '../../quml-library.service';
import { UtilService } from '../../util-service';
import { QuestionCursor } from '../../quml-question-cursor.service';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewerService, UtilService, QumlLibraryService, QuestionCursor],
    });
  });

  it('should be created', () => {
    const service: ViewerService = TestBed.get(ViewerService);
    expect(service).toBeTruthy();
  });

  it('should initialize player config', () => {
    const service = TestBed.get(ViewerService);
    const questionIds = [
      "do_21348431559137689613",
      "do_21348431640099225615"
    ];
    const qumlService = TestBed.get(QumlLibraryService);
    spyOn(qumlService, 'initializeTelemetry');
    service.initialize(mockData.playerConfig, 3, questionIds, mockData.parentConfig);
    // expect(service.src).toEqual(mockData.playerConfig.metadata.artifactUrl);
    // expect(service.endPageSeen).toBeFalsy();
  });

  it('should raise Start event ', () => {
    const service = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    spyOn(service.qumlPlayerEvent, 'emit');
    spyOn(qumlLibraryService, 'start');
    service.raiseStartEvent(1);
    expect(service.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(qumlLibraryService.start).toHaveBeenCalled();
  });

  it('should raise interact event', () => {
    const service = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    spyOn(qumlLibraryService, 'interact');
    service.raiseHeartBeatEvent('type', 'interact', 1);
    expect(qumlLibraryService.interact).toHaveBeenCalled();
  });

  it('should call getSectionQuestions', () => {
    const viewerService = TestBed.get(ViewerService);
    viewerService.sectionQuestions = mockData.mockSectionQuestions;
    const res = viewerService.getSectionQuestions('do_21348431528472576011');
    console.log(res);
    expect(res).toBeDefined();
  });

  it('should call updateSectionQuestions', () => {
    const viewerService = TestBed.get(ViewerService);
    viewerService.sectionQuestions = mockData.mockSectionQuestions;
    viewerService.updateSectionQuestions('do_21348431528472576011', mockData.mockSectionQuestions[0].questions);
    expect(viewerService.sectionQuestions[0].questions).toBeDefined();
  });

  it('should call updateSectionQuestions', () => {
    const viewerService = TestBed.get(ViewerService);
    viewerService.sectionQuestions = mockData.mockSectionQuestions;
    viewerService.updateSectionQuestions('do_21348431528472576012', mockData.mockSectionQuestions[0].questions);
    expect(viewerService.sectionQuestions.length).toEqual(2);
  });

  it('should call generateMaxAttemptEvents', () => {
    const viewerService = TestBed.get(ViewerService);
    viewerService.version = 1;
    const resp = viewerService.generateMaxAttemptEvents(1, false, false);
    expect(resp).toBeDefined();
  });

  it('should call raiseExceptionLog', () => {
    const viewerService = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    spyOn(viewerService.qumlPlayerEvent, 'emit');
    spyOn(qumlLibraryService, 'error');
    const resp = viewerService.raiseExceptionLog('CPV2_INT_CONNECT_01', 'content failed to load , No Internet Available', 'content failed to load , No Internet Available', 'id');
    expect(viewerService.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(qumlLibraryService.error).toHaveBeenCalled();
  });

  it('should raiseAssesEvent', () => {
    const viewerService = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    spyOn(viewerService.qumlPlayerEvent, 'emit');
    spyOn(qumlLibraryService, 'startAssesEvent');
    viewerService.raiseAssesEvent(mockData.questionData, 1, "Yes", 1, mockData.resValues, 2);
    expect(viewerService.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(qumlLibraryService.startAssesEvent).toHaveBeenCalled();
  });

  it('should raiseResponseEvent', () => {
    const viewerService = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    const optionSelected = {
      "label": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(32,33,36);\">Bill Gates</span></p>",
      "value": 1,
      "selected": true
    }
    spyOn(viewerService.qumlPlayerEvent, 'emit');
    spyOn(qumlLibraryService, 'response');
    viewerService.raiseResponseEvent("do_21348431640099225615", "MCQ", optionSelected);
    expect(viewerService.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(qumlLibraryService.response).toHaveBeenCalled();
  });

  it('should call raiseEndEvent', () => {
    const viewerService = TestBed.get(ViewerService);
    const utilService = TestBed.get(UtilService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    viewerService.metaData = mockData.metaData;
    viewerService.sectionQuestions = mockData.mockSectionQuestions;
    viewerService.qumlPlayerStartTime = 1646553243939;
    viewerService.version = "1.0";
    viewerService.totalNumberOfQuestions = 4;
    spyOn(viewerService.qumlPlayerEvent, 'emit');
    spyOn(utilService, 'getTimeSpentText');
    spyOn(qumlLibraryService, 'end');
    viewerService.raiseEndEvent(4, true, 2);
    expect(viewerService.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(utilService.getTimeSpentText).toHaveBeenCalled();
    expect(qumlLibraryService.end).toHaveBeenCalled();
  });

  it('should call raiseSummaryEvent', () => {
    const viewerService = TestBed.get(ViewerService);
    const qumlLibraryService = TestBed.get(QumlLibraryService);
    viewerService.qumlPlayerStartTime = 1646580090765;
    viewerService.totalNumberOfQuestions = 4;
    viewerService.version = "1.0";
    spyOn(viewerService.qumlPlayerEvent, 'emit');
    spyOn(qumlLibraryService, 'summary');
    viewerService.raiseSummaryEvent(4, true, 3, {
      "skipped": 0,
      "correct": 4,
      "wrong": 0,
      "partial": 0
    });

    expect(viewerService.qumlPlayerEvent.emit).toHaveBeenCalled();
    expect(qumlLibraryService.summary).toHaveBeenCalled();
  });
});
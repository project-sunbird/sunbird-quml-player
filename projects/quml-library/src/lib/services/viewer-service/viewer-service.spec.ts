import { TestBed } from '@angular/core/testing';
import { ViewerService } from './viewer-service';
import { mockData } from './viewer-service.data';
import { QumlLibraryService } from '../../quml-library.service';
import { UtilService } from '../../util-service';
import { QuestionCursor } from '../../quml-question-cursor.service';

fdescribe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService, QumlLibraryService, QuestionCursor],
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
  })
});
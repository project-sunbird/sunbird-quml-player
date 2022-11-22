import { TestBed } from '@angular/core/testing';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { QumlLibraryService } from './quml-library.service';
import { mockQumlLibraryServiceData, optionPlayerConfig } from './quml-library.service.data';

describe('QumlLibraryService', () => {

  class csTelemetryModule {
    instance: {
      telemetryService: {
        raiseAssesTelemetry: () => {}
      }
    }
  }

  function initializeServiceProperties(service: QumlLibraryService, mockQumlLibraryServiceData) {
    service['telemetryObject'] = mockQumlLibraryServiceData.telemetryObject;
    service['channel'] = mockQumlLibraryServiceData.channel;
    service['pdata'] = mockQumlLibraryServiceData.pdata;
    service['sid'] = mockQumlLibraryServiceData.sid;
    service['uid'] = mockQumlLibraryServiceData.uid;
    if ( mockQumlLibraryServiceData.config['context']) {
      service['context'] = mockQumlLibraryServiceData.config['context'];
    }
    service['playSessionId'] = mockQumlLibraryServiceData.playSessionId;
    service['contentSessionId'] = mockQumlLibraryServiceData.contentSessionId;
    service['rollup'] = mockQumlLibraryServiceData.rollup;
  }
  beforeEach(() => TestBed.configureTestingModule({
    providers: []
  }));

  it('should be created', () => {
    const service: QumlLibraryService = TestBed.inject(QumlLibraryService);
    expect(service).toBeTruthy();
  });

  it('should not initialize the telemetry', () => {
    const service = TestBed.inject(QumlLibraryService);
    spyOn(service, 'initializeTelemetry').and.callThrough();
    service.initializeTelemetry(mockQumlLibraryServiceData.config, mockQumlLibraryServiceData.parentConfig);
    expect(service['context']).not.toBeDefined();
  });

  it('should raise startAssesEvent', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    spyOn(service, 'getEventOptions').and.callThrough();
    spyOn(service, 'startAssesEvent').and.callThrough();
    service.startAssesEvent({});
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should raise response event', () => {
    const service = TestBed.inject(QumlLibraryService);
    // initializeServiceProperties(service, mockQumlLibraryServiceData);
    service.initializeTelemetry(mockQumlLibraryServiceData.config, mockQumlLibraryServiceData.parentConfig);
    spyOn(service, 'getEventOptions');
    service.response({}, {}, {}, {});
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should raise summary event', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    spyOn(service, 'getEventOptions');
    service.summary({});
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should raise interact event', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    spyOn(service, 'getEventOptions');
    service.interact({}, {}, {});
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should raise heartBeat event', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    service.heartBeat({});
  });

  it('should raise impression event', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    spyOn(service, 'getEventOptions');
    service.impression({});
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should raise error event', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    spyOn(service, 'getEventOptions');
    service.error(new Error('Dummy error'));
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });


  it('should call end event', () => {
    const service = TestBed.inject(QumlLibraryService);
    spyOn(service, 'getEventOptions');
    service.end(1200, 2, 5, 3, true, 1);
    expect(CsTelemetryModule.instance.isInitialised).toBeFalsy();
    expect(service.getEventOptions).not.toHaveBeenCalled();
  });

  it('should initialize the telemetry', () => {
    const service = TestBed.inject(QumlLibraryService);
    spyOn(service, 'initializeTelemetry').and.callThrough();
    service.initializeTelemetry(optionPlayerConfig.config, optionPlayerConfig.parentConfig);
    expect(service['context']).toBeDefined();
  });

  it('should call getEventOptions', () => {
    const service = TestBed.inject(QumlLibraryService);
    initializeServiceProperties(service, mockQumlLibraryServiceData);
    service.isSectionsAvailable = true;
    service.config = mockQumlLibraryServiceData.config;
    const options = service.getEventOptions();
    expect(options.object).toBeDefined();
  });

});

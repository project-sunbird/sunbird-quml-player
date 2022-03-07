import { TestBed } from '@angular/core/testing';

import { QumlLibraryService } from './quml-library.service';
import { mockQumlLibraryServiceData } from './quml-library.service.data';

describe('QumlLibraryService', () => {

  class csTelemetryModule {
    instance: {
      telemetryService: {
        raiseAssesTelemetry: () => {}
      }
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    providers: []
  }));

  it('should be created', () => {
    const service: QumlLibraryService = TestBed.get(QumlLibraryService);
    expect(service).toBeTruthy();
  });

  it('should initialize the telemetry', () => {
    const service = TestBed.get(QumlLibraryService);
    service.initializeTelemetry(mockQumlLibraryServiceData.config, mockQumlLibraryServiceData.parentConfig);
  });

  it('should raise startAssesEvent', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.startAssesEvent({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise start event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.start({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise response event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.response({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise summary event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.summary({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise interact event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.interact({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise heartBeat event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    service.heartBeat({});
  });

  it('should raise impression event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.impression({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });

  it('should raise error event', () => {
    const service = TestBed.get(QumlLibraryService);
    service.telemetryObject = mockQumlLibraryServiceData.telemetryObject;
    service.channel = mockQumlLibraryServiceData.channel;
    service.pdata = mockQumlLibraryServiceData.pdata;
    service.sid = mockQumlLibraryServiceData.sid;
    service.uid = mockQumlLibraryServiceData.uid;
    service.context = mockQumlLibraryServiceData.context;
    service.playSessionId = mockQumlLibraryServiceData.playSessionId;
    service.contentSessionId = mockQumlLibraryServiceData.contentSessionId;
    service.rollup = mockQumlLibraryServiceData.rollup;
    spyOn(service, 'getEventOptions');
    service.error({});
    expect(service.getEventOptions).toHaveBeenCalled();
  });


});

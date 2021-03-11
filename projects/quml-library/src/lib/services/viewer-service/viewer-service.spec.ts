import { TestBed } from '@angular/core/testing';
import { ViewerService } from './viewer-service';
import { mockData } from './viewer-service.data';
import { QumlLibraryService } from '../../quml-library.service';
import { UtilService } from '../../util-service';
import {TelemetryType} from '../../telemetry-constants';
 
describe('ViewerService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [UtilService, QumlLibraryService]
      });
    });

    it('should be created', () => {
        const service: ViewerService = TestBed.get(ViewerService);
        expect(service).toBeTruthy();
      });

      it('should initialize player config', () => {
        const service = TestBed.get(ViewerService);
        service.initialize(mockData.playerConfig);
        expect(service.src).toEqual(mockData.playerConfig.metadata.artifactUrl);
        expect(service.endPageSeen).toBeFalsy();
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

      it('should raise interact event' , () => {
        const service = TestBed.get(ViewerService);
        const qumlLibraryService = TestBed.get(QumlLibraryService);
        spyOn(qumlLibraryService , 'interact');
        service.raiseHeartBeatEvent('type', 'Interact',  1);
        expect(qumlLibraryService.interact).toHaveBeenCalled();
      })


      it('should raise error event', () => {
        const service: ViewerService = TestBed.get(ViewerService);
        const qumlLibraryService = TestBed.get(QumlLibraryService);
        spyOn(service.qumlPlayerEvent , 'emit');
        spyOn(service.qumlLibraryService, 'error');
        service.raiseErrorEvent(new Error());
        expect(service.qumlPlayerEvent.emit).toHaveBeenCalled();
        expect(service.qumlLibraryService.error).toHaveBeenCalled();
      })
});
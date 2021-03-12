import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from '../player/player.component';
import { QumlLibraryService } from '../quml-library.service';
import { mockData } from '../services/viewer-service/viewer-service.data';
import { ViewerService } from '../services/viewer-service/viewer-service';
import { UtilService } from '../util-service';
import { QumlPlayerConfig , optionSelected } from './player-component.data';
import { Observable, of } from 'rxjs';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  const mockQumlLibraryService: Partial<QumlLibraryService> = {};
  const mockViewerService: Partial<ViewerService> = {
    qumlPlayerEvent:{
    asObservable(): Observable<any>{
      return of()
    }
    } as any,
    raiseAssesEvent(): void {
      return;
    }
  };
  const mockUtilService : Partial<UtilService> = {
    getKeyValue() : any {
      return 'response1'
    }
  };
  const mockCar = jasmine.createSpyObj(CarouselComponent as any , ['getCurrentSlideIndex'])

  beforeAll(() => {
    component = new PlayerComponent(
      mockQumlLibraryService as QumlLibraryService,
      mockViewerService as ViewerService,
      mockUtilService as UtilService
    )
  })

  beforeEach(() => {
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call validateSelectedOption when correct option is selected', async()=> {
     window['correctOptionValue'] = 1;
     component.questions = QumlPlayerConfig.data.children;
     component.optionSelectedObj = optionSelected;
    component.car = {
      getCurrentSlideIndex() {
        return 1
      } 
    } as any;
     spyOn( mockUtilService , 'getKeyValue').and.returnValue('response1');
     spyOn(component , 'nextSlide');
     spyOn(component , 'updateScoreBoard');
     await component.validateSelectedOption(optionSelected);
     expect(component.currentScore).toEqual(1);
     expect(component.alertType).toBe('correct');
     expect(component.showAlert).toBeTruthy();
  });

  it('should call validateSelectedOption when wrong option is selected', async()=> {
    window['correctOptionValue'] = 2;
    component.questions = QumlPlayerConfig.data.children;
    component.optionSelectedObj = optionSelected;
   component.car = {
     getCurrentSlideIndex() {
       return 1
     } 
   } as any;
    spyOn( mockUtilService , 'getKeyValue').and.returnValue('response1');
    spyOn(component , 'nextSlide');
    spyOn(component , 'updateScoreBoard');
    await component.validateSelectedOption(optionSelected);
    expect(component.currentScore).toEqual(1);
    expect(component.alertType).toBe('correct');
    expect(component.showAlert).toBeTruthy();
 });

});
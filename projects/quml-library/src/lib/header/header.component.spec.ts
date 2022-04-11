import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewerService } from '../services/viewer-service/viewer-service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  class ViewerServiceMock {
    initialize() { }
    raiseStartEvent() { }
    raiseHeartBeatEvent() { }
    getQuestions() { }
    updateSectionQuestions() { }
    raiseExceptionLog() { }
    getQuestion() { }
    raiseResponseEvent() { }
    getSectionQuestions() { }
    raiseAssesEvent() { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ViewerService, useClass: ViewerServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('Check Timer method', fakeAsync(() => {
    component.duration = 5;
    component.warningTime = '2';
    let durationInSec = component.duration;
    spyOn(component.durationEnds, 'emit');
    const interval = setInterval(() => {
      let min = ~~(durationInSec / 60);
      let sec = (durationInSec % 60);
      if (sec < 10) {
        component.time = min + ':' + '0' + sec;
      } else {
        component.time = min + ':' + sec;
      }
      if (durationInSec === 0) {
        component.durationEnds.emit(true);
        return false;
      }
      if (durationInSec <= component.warningTime) {
        component.showWarning = true;
      }
      durationInSec--;
    }, 10);
    component.timer();
    tick(11);
    expect(component.time).toBe('0:05');
    expect(component.showWarning).toBeFalsy();

    tick(11);
    expect(component.time).toBe('0:04');
    expect(component.showWarning).toBeFalsy();

    tick(11);
    expect(component.time).toBe('0:03');
    expect(component.showWarning).toBeFalsy();

    tick(11);
    expect(component.time).toBe('0:02');
    expect(component.showWarning).toBeTruthy();

    tick(11);
    expect(component.time).toBe('0:01');
    expect(component.showWarning).toBeTruthy();

    tick(11);
    expect(component.time).toBe('0:00');
    expect(component.durationEnds.emit).toHaveBeenCalledWith(true);
    expect(component.showWarning).toBeTruthy();

    flush();
  }));

  it('should initialize the component', () => {
    component.duration = 600;
    component.showTimer = true;
    component.ngOnInit();
    expect(component.minutes).toBe(10);
  });

  it('should execute on changes', () => {
    component.duration = 600;
    component.showTimer = true;
    component.initializeTimer = true;
    component.replayed = true;
    component['intervalRef'] = null;
    spyOn(component, 'timer');
    spyOn(window, 'clearInterval');
    component.ngOnChanges();
    expect(component.timer).toHaveBeenCalledTimes(2);
    expect(component.showWarning).toBe(false);
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should call countUp on changes', () => {
    component.duration = 0;
    component.showTimer = true;
    component.initializeTimer = true;
    component['intervalRef'] = null;
    component.replayed = true;
    spyOn(component, 'showCountUp');
    spyOn(window, 'clearInterval');
    component.ngOnChanges();
    expect(component.showCountUp).toHaveBeenCalledTimes(2);
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should navigate to the next slide', () => {
    component.disableNext = false;
    spyOn(component.nextSlideClicked, 'emit');
    component.nextSlide();
    expect(component.nextSlideClicked.emit).toHaveBeenCalledWith({ type: 'next' });
  });

  it('should not navigate to the previous slide, if the current slide is start page', () => {
    component.showStartPage = false;
    component.currentSlideIndex = 1;
    spyOn(component.prevSlideClicked, 'emit');
    component.prevSlide();
    expect(component.prevSlideClicked.emit).not.toHaveBeenCalledWith({ event: 'previous clicked' });
  });

  it('should navigate to the previous slide', () => {
    component.showStartPage = true;
    component.currentSlideIndex = 2;
    component.disablePreviousNavigation = false;
    spyOn(component.prevSlideClicked, 'emit');
    component.prevSlide();
    expect(component.prevSlideClicked.emit).toHaveBeenCalledWith({ event: 'previous clicked' });
  });

  it('should emit the show solution event on answer keydown', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'stopPropagation');
    spyOn(component.showSolution, 'emit');
    component.onAnswerKeyDown(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.showSolution.emit).toHaveBeenCalled();
  });

  it('should clean up the component state', () => {
    component['intervalRef'] = {};
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should open the progress indicator popup', () => {
    const viewerService = TestBed.get(ViewerService);
    component.showProgressIndicatorPopUp = false;
    component.currentSlideIndex = 1;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.openProgressIndicatorPopup();
    expect(component.showProgressIndicatorPopUp).toBeTruthy();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('PROGRESS_INDICATOR_POPUP_OPENED', 'interact', 1);
  });

  it('should close the progress indicator popup', () => {
    const viewerService = TestBed.get(ViewerService);
    component.showProgressIndicatorPopUp = true;
    component.currentSlideIndex = 1;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.onProgressPopupClose();
    expect(component.showProgressIndicatorPopUp).toBeFalsy();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('PROGRESS_INDICATOR_POPUP_CLOSED', 'interact', 1);
  });
});

import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
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

  it('should open the side bar', () => {
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openNav();
    expect(document.body.style.backgroundColor).toEqual('rgba(0, 0, 0, 0.4)');
  });


  it('should close the side bar', () => {
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.closeNav();
    expect(document.body.style.backgroundColor).toEqual('white');
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
});

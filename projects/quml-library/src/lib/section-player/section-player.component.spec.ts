import { CommonModule } from '@angular/common';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ErrorService, SunbirdPlayerSdkModule } from '@project-sunbird/sunbird-player-sdk-v9';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { of } from 'rxjs';
import { fakeMainProgressBar } from '../main-player/main-player.component.spec.data';
import { QumlLibraryService } from '../quml-library.service';
import { ViewerService } from '../services/viewer-service/viewer-service';
import { QuestionCursor } from './../quml-question-cursor.service';
import { SectionPlayerComponent } from './section-player.component';
import { mockSectionConfig, mockSectionProgressBar, mockSectionQuestions } from './section-player.component.spec.data';

describe('SectionPlayerComponent', () => {
  let component: SectionPlayerComponent;
  let fixture: ComponentFixture<SectionPlayerComponent>;
  let viewerService;

  class ViewerServiceMock {
    raiseStartEvent() { }
    raiseHeartBeatEvent() { }
    getQuestions() { }
  }

  class ElementRefMock {
    nativeElement: {
      style: {
        height: string;
        width: string;
      }
    };
  }

  const myCarousel = jasmine.createSpyObj("CarouselComponent", {
    "getCurrentSlideIndex": 1, "selectSlide": {}
  }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionPlayerComponent, CarouselComponent],
      imports: [
        SunbirdPlayerSdkModule,
        CommonModule
      ],
      providers: [
        QumlLibraryService,
        QuestionCursor,
        { provide: ViewerService, useClass: ViewerServiceMock },
        { provide: ElementRef, useClass: ElementRefMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPlayerComponent);
    component = fixture.componentInstance;
    viewerService = TestBed.get(ViewerService);
    component.imageModal = TestBed.get(ElementRef);
    component.questionSlide = TestBed.get(ElementRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to events and set config on every changes', () => {
    spyOn<any>(component, 'subscribeToEvents');
    spyOn<any>(component, 'setConfig');
    component.ngOnChanges({});
    expect(component['subscribeToEvents']).toHaveBeenCalled();
    expect(component['setConfig']).toHaveBeenCalled();
  });

  it('should add skipped class', ()=> {
    component.progressBarClass = fakeMainProgressBar;
    component.setSkippedClass(0);
  });

  it('should handle sideBarEvents', () => {
    spyOn(component, 'handleSideBarAccessibility');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.myCarousel = myCarousel;
    const event = { event: new KeyboardEvent('keydown', {}), type: 'CLOSE_MENU' }
    component.sideBarEvents(event);
    expect(component['handleSideBarAccessibility']).toHaveBeenCalled();
    expect(viewerService['raiseHeartBeatEvent']).toHaveBeenCalled();
  });


  it('should hide the popup once the time is over', fakeAsync(() => {
    component.infoPopupTimeOut();
    tick(2000);
    expect(component.infoPopup).toBe(false);
  }));

  it('should navigate to the instruction page', () => {
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.myCarousel = myCarousel;
    component.sectionIndex = 0;
    component.showStartPage = true;
    component.sectionConfig = mockSectionConfig;
    component.goToSlide(0);
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.disableNext).toBe(false);
    expect(component.currentSlideIndex).toBe(0);
    expect(component.showRootInstruction).toBe(true);
  });

  it('should navigate to the page', () => {
    component.myCarousel = myCarousel;
    component.sectionIndex = 1;
    component.showStartPage = true;
    component.sectionConfig = mockSectionConfig;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(component, 'setImageZoom');
    spyOn(component, 'highlightQuestion');
    component.goToSlide(1);
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.disableNext).toBe(false);
    expect(component.currentSlideIndex).toBe(1);
    expect(component.setImageZoom).toHaveBeenCalled();
    expect(component.highlightQuestion).toHaveBeenCalled();
  });

  it('should navigate to the next question', () => {
    component.active = true;
    component.myCarousel = myCarousel;
    spyOn(viewerService, 'getQuestions');
    spyOn(component, 'highlightQuestion');
    component.goToQuestion({ questionNo: 2 });
    expect(viewerService.getQuestions).toHaveBeenCalled();
    expect(component.highlightQuestion).toHaveBeenCalled();
  });

  it('should hight light the question on click of question', () => {
    component.questions = mockSectionQuestions;
    component.currentSlideIndex = 1;
    const dummyElement = document.createElement('div');
    const mcq = document.createElement('div');
    mcq.setAttribute('class', 'mcq-title');
    dummyElement.appendChild(mcq);
    spyOn(document, 'getElementById').and.returnValue(dummyElement);
    component.highlightQuestion();
    expect(document.getElementById).toHaveBeenCalled()
  });

  it('should fetch the solution', () => {
    component.showAlert = true;
    component.myCarousel = myCarousel
    component.questions = mockSectionQuestions;
    component.currentSolutions = {};
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(component, 'clearTimeInterval');
    component.getSolutions();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledTimes(2);
    expect(component.clearTimeInterval).toHaveBeenCalled();
  });

  it('should show solution page if solution is available', () => {
    component.showSolution = false;
    component.myCarousel = myCarousel;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(window, 'clearTimeout');
    component.viewSolution();
    expect(component.showSolution).toBeTruthy();
    expect(component.showAlert).toBeFalsy();
    expect(window.clearTimeout).toHaveBeenCalled();
  });

  it('should close the solution Modal', () => {
    component.showSolution = true;
    spyOn(component, 'setImageZoom');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(component, 'focusOnNextButton');
    component.myCarousel = myCarousel;
    component.closeSolution();
    expect(component.setImageZoom).toHaveBeenCalled();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.focusOnNextButton).toHaveBeenCalled();
    expect(component.showSolution).toBeFalsy();
  });

  it('should show hint', () => {
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.myCarousel = myCarousel;
    component.viewHint();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
  });

  it('should show the solution page on click of answer button', () => {
    const enterKeyEvent = new KeyboardEvent('keypress', {
      cancelable: true,
      key: 'Enter',
    });
    spyOn(enterKeyEvent, 'stopPropagation');
    spyOn(component, 'getSolutions');
    component.onAnswerKeyDown(enterKeyEvent);
    expect(component.getSolutions).toHaveBeenCalled();
    expect(enterKeyEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should calculate the score', () => {
    component.progressBarClass = mockSectionProgressBar.children;
    const score = component.calculateScore();
    expect(score).toBe(2);
  });

  it('should call updateScoreBoard', () => {
    component.progressBarClass = mockSectionProgressBar.children;
    component.showFeedBack = false;
    component.updateScoreBoard(0, 'correct', 'This is correct ans', 1);
    component.progressBarClass[0].class = 'correct';
    component.progressBarClass[0].score = 1;
    component.progressBarClass[0].value = 'This is correct ans';
  })

  it('should call setImageZoom', () => {
    component.myCarousel = myCarousel;
    component.setImageZoom();
  });

  it('should zoom in the image', () => {
    component.imageZoomCount = 10;
    component.myCarousel = myCarousel;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(component, 'setImageModalHeightWidth');
    component.zoomIn();
    expect(component.imageZoomCount).toEqual(20);
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.setImageModalHeightWidth).toHaveBeenCalled();
  });

  it('should zoom out the image', () => {
    component.imageZoomCount = 110;
    component.myCarousel = myCarousel;
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(component, 'setImageModalHeightWidth');
    component.zoomOut();
    expect(component.myCarousel.getCurrentSlideIndex).toHaveBeenCalled();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.imageZoomCount).toEqual(100);
    expect(component.setImageModalHeightWidth).toHaveBeenCalled();
  });

  xit('should set height and width to the modal', () => {
    component.imageZoomCount = 20;
    component.imageModal = new ElementRef({ nativeElement: jasmine.createSpyObj('nativeElement', ['style', 'height', 'width']) });
    component.setImageModalHeightWidth();
    expect(component.imageModal.nativeElement.style.height).toBe('20%');
    expect(component.imageModal.nativeElement.style.width).toBe('20%');
  });

  it('should close the zoom popup', () => {
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.myCarousel = myCarousel;
    component.closeZoom();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
    expect(component.showZoomModal).toBe(false);
    expect(component.myCarousel.getCurrentSlideIndex).toHaveBeenCalled();
  });

  it('should clear the time interval', () => {
    component.intervalRef = setTimeout(() => { }, 0);
    spyOn(window, 'clearInterval');
    component.clearTimeInterval();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should clean up the state before leaving the page', () => {
    const errorService = TestBed.get(ErrorService);
    component.subscription = of(1, 2, 3).subscribe();
    spyOn(component['destroy$'], 'next');
    spyOn(errorService.getInternetConnectivityError, 'unsubscribe');
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalledWith(true);
    expect(errorService.getInternetConnectivityError.unsubscribe).toHaveBeenCalled();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});

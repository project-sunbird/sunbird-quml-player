import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';
import { ViewerService } from '../services/viewer-service/viewer-service';

import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

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
      declarations: [ScoreboardComponent, SafeHtmlPipe],
      providers: [{ provide: ViewerService, useClass: ViewerServiceMock },],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    spyOn(component.scoreBoardLoaded, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'stopPropagation');
    document.dispatchEvent(event);
    component.ngOnInit();
    expect(component.scoreBoardLoaded.emit).toHaveBeenCalledWith({ scoreBoardLoaded: true });
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should emit the event with question number', () => {
    spyOn(component.emitQuestionNo, 'emit');
    component.goToQuestion(1, 'do_121212');
    expect(component.emitQuestionNo.emit).toHaveBeenCalledWith({ questionNo: 1, identifier: 'do_121212' });
  });

  it('should clean up the subscription', () => {
    component.subscription = of(1, 2, 3).subscribe();
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should call onReviewClicked for section Level questions', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.isSections = true;
    component.scores = [{ identifier: 'do_123' }, { identifier: 'do_456' }];
    spyOn(component, 'goToQuestion');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.onReviewClicked();
    expect(component.goToQuestion).toHaveBeenCalled();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('SCORE_BOARD_REVIEW_CLICKED', 'interact', 'SUBMIT_PAGE');
  });

  it('should call onReviewClicked', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.isSections = false;
    component.scores = [{ identifier: 'do_123' }, { identifier: 'do_456' }];
    spyOn(component, 'goToQuestion');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.onReviewClicked();
    expect(component.goToQuestion).toHaveBeenCalledWith(1);
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('SCORE_BOARD_REVIEW_CLICKED', 'interact', 'SUBMIT_PAGE');
  });
});

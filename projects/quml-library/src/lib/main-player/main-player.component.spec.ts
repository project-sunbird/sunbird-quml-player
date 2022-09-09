import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SunbirdPlayerSdkModule } from '@project-sunbird/sunbird-player-sdk-v9';
import { QuestionCursor } from './../quml-question-cursor.service';
import { QumlLibraryService } from '../quml-library.service';

import { MainPlayerComponent } from './main-player.component';
import { ViewerService } from '../services/viewer-service/viewer-service';
import { fakeMainProgressBar, fakeSections, playerConfig, singleContent } from './main-player.component.spec.data';
import { UtilService } from '../util-service';
import { of } from 'rxjs';

describe('MainPlayerComponent', () => {
  let component: MainPlayerComponent;
  let fixture: ComponentFixture<MainPlayerComponent>;

  const myCarousel = jasmine.createSpyObj("CarouselComponent", {
    "getCurrentSlideIndex": 1, "selectSlide": {}, "move": {}, isLast: false
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPlayerComponent],
      imports: [
        SunbirdPlayerSdkModule,
        CommonModule
      ],
      providers: [QumlLibraryService, QuestionCursor],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPlayerComponent);
    component = fixture.componentInstance;
    component.playerConfig = playerConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle the "document.TelemetryEvent" event', () => {
    spyOn(component, 'onTelemetryEvent');
    const telemetryEvent = new Event('TelemetryEvent');
    document.dispatchEvent(telemetryEvent);
    expect(component.onTelemetryEvent).toHaveBeenCalled();
  });

  it('should accept the stringified input as well', () => {
    component.playerConfig = JSON.stringify(playerConfig) as any;
    spyOn(component, 'setConfig');
    spyOn(component, 'initializeSections');
    component.ngOnInit();
    expect(component.isLoading).toBe(true);
    expect(component.setConfig).toHaveBeenCalled();
    expect(component.initializeSections).toHaveBeenCalled();
  });

  it('should initialize the sections, if available', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.playerConfig = playerConfig;
    spyOn<any>(component, 'getMultilevelSection');
    spyOn(component, 'setInitialScores');
    component.initializeSections();
    expect(component['getMultilevelSection']).toHaveBeenCalled();
    expect(component.setInitialScores).toHaveBeenCalled();
  });

  it('should set config for the question set', () => {
    component.playerConfig = playerConfig;
    component.playerConfig.metadata.isAvailableLocally = true;
    component.playerConfig.metadata.basePath = 'localhost:8101/';
    spyOn(component, 'emitMaxAttemptEvents');
    component.setConfig();
    expect(component.userName).toEqual('Vivek Kasture');
    expect(component.attempts).toEqual({ max: 3, current: 1 });
    expect(component.emitMaxAttemptEvents).toHaveBeenCalled();
    expect(component.initialTime > 0).toBeTruthy();
  });

  it('should return true if the question set has multilevel sections', () => {
    component.playerConfig = playerConfig;
    const isMultilevel = component['getMultilevelSection'](playerConfig.metadata);
    expect(isMultilevel).toBe(false);
  });

  it('should return true if the array has children in it', () => {
    const arr = [
      { name: 'content1', identifier: 'do_123' },
      { name: 'content2', identifier: 'do_132', children: { name: 'child1', identifier: 'do_234' } }
    ];
    const hasChildren = component['hasChildren'](arr);
    expect(hasChildren).toBe(true);
  });

  it('should emit the max attempt event when attempts are about to exhaust', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.playerConfig = playerConfig;
    component.playerConfig.metadata.currentAttempt = 2;
    component.attempts = {
      max: playerConfig.metadata.maxAttempts,
      current: 2
    };
    spyOn(component.playerEvent, 'emit');
    spyOn(viewerService, 'generateMaxAttemptEvents');
    component.emitMaxAttemptEvents();
    expect(component.playerEvent.emit).toHaveBeenCalled();
    expect(viewerService.generateMaxAttemptEvents).toHaveBeenCalledWith(2, false, true);
  });


  it('should emit the max attempt event when all the attempts are exhausted', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.playerConfig = playerConfig;
    component.playerConfig.metadata.currentAttempt = 3;
    component.attempts = {
      max: playerConfig.metadata.maxAttempts,
      current: 3
    };
    spyOn(component.playerEvent, 'emit');
    spyOn(viewerService, 'generateMaxAttemptEvents');
    component.emitMaxAttemptEvents();
    expect(component.playerEvent.emit).toHaveBeenCalled();
    expect(viewerService.generateMaxAttemptEvents).toHaveBeenCalledWith(3, true, false);
  });

  it('should return active section index', () => {
    component.activeSection = fakeSections[0];
    component.sections = fakeSections;
    const activeSectionIndex = component.getActiveSectionIndex();
    expect(activeSectionIndex).toEqual(0);
  })

  it('should show scoreboard', () => {
    component.parentConfig.isSectionsAvailable = true;
    spyOn(component, 'getActiveSectionIndex').and.returnValue(0);
    spyOn(component, 'updateSectionScore');
    component.onShowScoreBoard({});
    expect(component.getActiveSectionIndex).toHaveBeenCalled();
    expect(component.updateSectionScore).toHaveBeenCalledWith(0);
    expect(component.loadScoreBoard).toBeTruthy();

  });

  it('should call onSectionEnded when sections are available', () => {
    component.parentConfig.isSectionsAvailable = true;
    spyOn(component, 'getActiveSectionIndex');
    spyOn(component, 'updateSectionScore');
    spyOn(component, 'setNextSection');
    component.onSectionEnd({});
    expect(component.getActiveSectionIndex).toHaveBeenCalled();
    expect(component.updateSectionScore).toHaveBeenCalled();
    expect(component.setNextSection).toHaveBeenCalled();
  });

  it('should call onSectionEnded when there is no section', () => {
    component.parentConfig.isSectionsAvailable = false;
    spyOn(component, 'prepareEnd');
    component.onSectionEnd({});
    expect(component.prepareEnd).toHaveBeenCalled();
  });

  it('should emit player event forward', () => {
    spyOn(component.playerEvent, 'emit');
    component.onPlayerEvent({});
    expect(component.playerEvent.emit).toHaveBeenCalled();
  });

  it('should call updateSectionScore', () => {
    component.mainProgressBar = fakeMainProgressBar;
    component.updateSectionScore(0);
    expect(component.mainProgressBar[0].score).toBe(2);
  });

  it('should set next section if duration is expired', () => {
    const event = {
      summary: {
        correct: 2,
        partial: 0,
        skipped: 0,
        wrong: 0
      },
      durationSpent: "0:49",
      isDurationEnded: true,
      score: 2,
      slideIndex: 2,
    }
    const utilService = TestBed.inject(UtilService);
    component.isDurationExpired = false;
    spyOn(utilService, 'sumObjectsByKey').and.returnValue(event.summary);
    spyOn(component, 'prepareEnd');
    component.setNextSection(event, 1);
    expect(utilService.sumObjectsByKey).toHaveBeenCalled();
    expect(component.prepareEnd).toHaveBeenCalled();
    expect(component.isDurationExpired).toBe(true);
  });


  it('should set next section if duration is not expired', () => {
    const event = {
      summary: {
        correct: 2,
        partial: 0,
        skipped: 0,
        wrong: 0
      },
      durationSpent: "0:49",
      isDurationEnded: false,
      score: 2,
      slideIndex: 2,
      jumpToSection: true
    }
    const utilService = TestBed.inject(UtilService);
    component.isDurationExpired = false;
    component.mainProgressBar = fakeMainProgressBar;
    spyOn(utilService, 'sumObjectsByKey').and.returnValue(event.summary);
    spyOn(component, 'prepareEnd');
    component.setNextSection(event, 1);
    expect(utilService.sumObjectsByKey).toHaveBeenCalled();
    expect(component.prepareEnd).toHaveBeenCalled();
    expect(component.isDurationExpired).toBe(false);
    expect(component.prepareEnd).toHaveBeenCalled();
  });

  it('should calculate the final score and time spent before end event generated and when submit page is available', () => {
    component.parentConfig.requiresSubmit = true;
    spyOn(component, 'calculateScore');
    spyOn(component, 'setDurationSpent');
    component.prepareEnd({});
    expect(component.calculateScore).toHaveBeenCalled();
    expect(component.setDurationSpent).toHaveBeenCalled();
    expect(component.loadScoreBoard).toBeTruthy();
  });

  it('should calculate the final score and time spent before end event generated and when submit page is not available', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.parentConfig.requiresSubmit = false;
    spyOn(component, 'calculateScore');
    spyOn(component, 'setDurationSpent');
    spyOn(component, 'getSummaryObject');
    spyOn(viewerService, 'raiseSummaryEvent');
    spyOn(component, 'raiseEndEvent');
    component.prepareEnd({});
    expect(component.calculateScore).toHaveBeenCalled();
    expect(component.setDurationSpent).toHaveBeenCalled();
    expect(viewerService.raiseSummaryEvent).toHaveBeenCalled();
    expect(component.raiseEndEvent).toHaveBeenCalled();
    expect(component.endPageReached).toBeTruthy();
    expect(component.isSummaryEventRaised).toBeTruthy();
    expect(component.isEndEventRaised).toBeTruthy();
  });

  it('should replay the content and do necessary operations', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.parentConfig.isReplayed = false;
    component.attempts = { max: 3, current: 2 }
    spyOn(component, 'initializeSections');
    spyOn(viewerService, 'generateMaxAttemptEvents');
    spyOn(component.playerEvent, 'emit');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.replayContent();
    expect(component.replayContent).toBeTruthy();
    expect(component.initializeSections).toHaveBeenCalled();
    expect(viewerService.generateMaxAttemptEvents).toHaveBeenCalledWith(3, false, true);
    expect(component.playerEvent.emit).toHaveBeenCalled();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
  });

  it('should set Initial Score for the question set', () => {
    component.totalNoOfQuestions = 0;
    component.mainProgressBar = [];
    component.sections = fakeSections;
    component.setInitialScores(0);
    expect(component.totalNoOfQuestions).toEqual(4);
    expect(component.mainProgressBar.length).toBe(2);
  });

  it('should call exit the content player and do necessary clean up', () => {
    const viewerService = TestBed.inject(ViewerService);
    spyOn(component, 'calculateScore');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(viewerService, 'raiseSummaryEvent');
    spyOn(component, 'getSummaryObject');
    spyOn(component, 'raiseEndEvent');
    component.exitContent({ type: 'EXIT' });
    expect(component.calculateScore).toHaveBeenCalled();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('EXIT', 'interact', 'END_PAGE');
    expect(viewerService.raiseSummaryEvent).toHaveBeenCalled();
    expect(component.getSummaryObject).toHaveBeenCalled();
    expect(component.raiseEndEvent).toHaveBeenCalled();
  });

  it('should call play method', () => {
    component.attempts = { max: 3, current: 3 }
    component.isEndEventRaised = false;
    const viewerService = TestBed.inject(ViewerService);
    viewerService.metaData = {
      progressBar: fakeMainProgressBar
    }
    spyOn(viewerService, 'raiseEndEvent');
    spyOn(component.playerEvent, 'emit');
    spyOn(viewerService, 'generateMaxAttemptEvents');
    component.raiseEndEvent(4, true, 4);

    expect(viewerService.raiseEndEvent).toHaveBeenCalledWith(4, true, 4);
    expect(viewerService.generateMaxAttemptEvents).toHaveBeenCalledWith(3, true, false);
    expect(component.playerEvent.emit).toHaveBeenCalled();
  });

  it('should not raise end event if already raised', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.isEndEventRaised = true;
    spyOn(viewerService, 'raiseEndEvent');
    component.raiseEndEvent(4, true, 4);
    expect(viewerService.raiseEndEvent).not.toHaveBeenCalled();
  });

  it('should raise an end event, if not not raised', () => {
    const viewerService = TestBed.inject(ViewerService);
    viewerService.metaData = {
      progressBar: [],
    };
    component.isEndEventRaised = false;
    spyOn(viewerService, 'raiseEndEvent');
    component.raiseEndEvent(4, true, 4);
    expect(viewerService.raiseEndEvent).toHaveBeenCalled();
  });

  it('should call setDurationSpent', () => {
    const viewerService = TestBed.inject(ViewerService);
    viewerService.metaData = {
      duration: 0,
    };
    const utilService = TestBed.inject(UtilService);
    component.playerConfig = playerConfig;
    component.initialTime = new Date().getTime() - 1000;
    spyOn(utilService, 'getTimeSpentText').and.returnValue('01:00');
    component.setDurationSpent();
    expect(utilService.getTimeSpentText).toHaveBeenCalled();
  });

  it('should call onScoreBoardLoaded', () => {
    spyOn(component, 'calculateScore');
    component.onScoreBoardLoaded({ scoreBoardLoaded: true });
    expect(component.calculateScore).toHaveBeenCalled();
  });

  it('should call onScoreBoardSubmitted', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.endPageReached = false;
    spyOn(component, 'getSummaryObject');
    spyOn(component, 'setDurationSpent');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    spyOn(viewerService, 'raiseSummaryEvent');
    spyOn(component, 'raiseEndEvent');
    component.onScoreBoardSubmitted();
    expect(component.endPageReached).toBe(true);
    expect(component.loadScoreBoard).toBe(false);
    expect(component.isSummaryEventRaised).toBe(true);
  });

  it('should generate OutCome Label when there is total score available', () => {
    component.finalScore = 5;
    component.totalScore = 10;
    component.playerConfig = playerConfig;
    component.generateOutComeLabel();
    expect(component.outcomeLabel).toEqual('5 / 10');
  });

  it('should generate OutCome Label when there is no total score available', () => {
    component.finalScore = 5;
    component.totalScore = undefined;
    component.playerConfig = playerConfig;
    component.generateOutComeLabel();
    expect(component.outcomeLabel).toBe('5');
  });

  it('should generate OutCome Label, when summary Type is Duration', () => {
    component.finalScore = 5;
    component.totalScore = 10;
    component.playerConfig = playerConfig;
    component.playerConfig.metadata.summaryType = 'Duration';
    component.generateOutComeLabel();
    expect(component.outcomeLabel).toEqual('');
  });

  it('should call goToQuestion', () => {
    component.parentConfig.isSectionsAvailable = true;
    component.sections = fakeSections;
    component.mainProgressBar = fakeMainProgressBar;
    component.goToQuestion({ identifier: 'do_21348431657166438417' });
    expect(component.activeSection).toEqual(component.sections[1]);
    expect(component.loadScoreBoard).toBe(false);
    expect(component.jumpToQuestion).toEqual({ identifier: 'do_21348431657166438417' });
    expect(component.mainProgressBar[1].isActive).toBe(true);
  });

  it('should call playNextContent', () => {
    const viewerService = TestBed.inject(ViewerService);
    spyOn(viewerService, 'raiseHeartBeatEvent').and.returnValue(null);
    component.playNextContent({ type: 'NEXT_CONTENT_PLAY', identifier: 'do_123' });
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalled();
  });

  it('should call ngOnDestroy', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.totalVisitedQuestion = 4;
    component.endPageReached = true;
    component.finalScore = 4;
    component.summary = {
      correct: 4,
      partial: 0,
      skipped: 0,
      wrong: 0
    };
    component.isSummaryEventRaised = false;
    component.subscription = of(1, 2, 3).subscribe();
    spyOn(component, 'calculateScore');
    spyOn<any>(component, 'getSummaryObject');
    spyOn(viewerService, 'raiseSummaryEvent');
    spyOn(component, 'raiseEndEvent');
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.calculateScore).toHaveBeenCalled();
    expect(component.getSummaryObject).toHaveBeenCalled();
    expect(viewerService.raiseSummaryEvent).toHaveBeenCalledWith(4, true, 4, {
      correct: 4,
      partial: 0,
      skipped: 0,
      wrong: 0
    });
    expect(component.raiseEndEvent).toHaveBeenCalledWith(4, true, 4);
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should show error if the the multilevel sections are present', () => {
    component.playerConfig = playerConfig;
    component.playerConfig.metadata.children[0].children[0].children = [];
    component.initializeSections();
    expect(component.isMultiLevelSection).toBe(true);
    expect(component.contentError).toEqual({
      messageHeader: 'Unable to load content',
      messageTitle: 'Multi level sections are not supported as of now'
    });
  });

  it('should initialize the sections, if not available', () => {
    const viewerService = TestBed.inject(ViewerService);
    component.playerConfig = playerConfig;
    component.playerConfig.metadata = singleContent;
    component.initializeSections();
  });

  it('should handle sideBarEvents', () => {
    const viewerService = TestBed.inject(ViewerService);
    spyOn(component, 'handleSideBarAccessibility');
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.sectionPlayer = {} as any;
    component.sectionPlayer.myCarousel = myCarousel;
    const event = { event: new KeyboardEvent('keydown', {}), type: 'CLOSE_MENU' }
    component.sideBarEvents(event);
    expect(component['handleSideBarAccessibility']).toHaveBeenCalled();
    expect(viewerService['raiseHeartBeatEvent']).toHaveBeenCalled();
  });

  it('should call toggleScreenRotate', () => {
    const viewerService = TestBed.inject(ViewerService);
    spyOn(viewerService, 'raiseHeartBeatEvent');
    component.sectionPlayer = {} as any;
    component.sectionPlayer.myCarousel = myCarousel;
    component.toggleScreenRotate();
    expect(viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('DEVICE_ROTATION_CLICKED', 'interact', 2);
  });

  it('should handle close the menu with Accessibility', () => {
    component.playerConfig = playerConfig;
    component.disabledHandle = {
      disengage: () => { }
    };
    component.subscription = of(1, 2, 3).subscribe();
    component.handleSideBarAccessibility({ type: 'CLOSE_MENU' });
    expect(component.disabledHandle).toBeNull();
    expect(component.subscription).toBeNull();
  });

  it('should call calculateScore', () => {
    component.mainProgressBar = fakeMainProgressBar;
    spyOn(component, 'generateOutComeLabel');
    const score = component.calculateScore();
    expect(component.generateOutComeLabel).toHaveBeenCalled();
    expect(score).toEqual(2);
  });


});

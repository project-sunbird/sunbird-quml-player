import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DurationtimerComponent } from '../icon/durationtimer/durationtimer.component';
import { PreviousComponent } from '../icon/previous/previous.component';
import { NextComponent } from '../icon/next/next.component';
import { NextActiveComponent } from '../icon/next-active/next-active.component';
import { HintComponent } from '../icon/hint/hint.component';
import { AnsComponent } from '../icon/ans/ans.component';



fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, DurationtimerComponent, PreviousComponent, NextComponent,
        NextActiveComponent, HintComponent, AnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call timer', () => {
    component.duration = 20;
    component.warningTime = 10;
    spyOn(component.durationEnds, 'emit');
    component.timer();
    if (component.duration === 0) {
      expect(component.durationEnds.emit).toHaveBeenCalledWith(true);
    }
    expect(component.showWarning).toBeFalsy();
    if (component.duration <= component.warningTime) {
      expect(component.showWarning).toBeTruthy();
    }
  });
});

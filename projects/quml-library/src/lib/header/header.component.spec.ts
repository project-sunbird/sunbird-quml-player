import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DurationtimerComponent } from '../icon/durationtimer/durationtimer.component';
import { PreviousComponent } from '../icon/previous/previous.component';
import { NextComponent } from '../icon/next/next.component';
import { NextActiveComponent } from '../icon/next-active/next-active.component';
import { HintComponent } from '../icon/hint/hint.component';
import { AnsComponent } from '../icon/ans/ans.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, DurationtimerComponent, PreviousComponent, NextComponent,
        NextActiveComponent, HintComponent, AnsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    jasmine.clock().uninstall();
    jasmine.clock().install();
    fixture.detectChanges();
  });

  it('Check Timer method', () => {  
    component.duration = 5;
    component.warningTime = 2;
    let durationInSec = component.duration;
    spyOn(component.durationEnds, 'emit');
    setInterval(() => {
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
    jasmine.clock().tick(11);
    expect(component.time).toBe('0:05');
    expect(component.showWarning).toBeFalsy();

    jasmine.clock().tick(11);
    expect(component.time).toBe('0:04');
    expect(component.showWarning).toBeFalsy();

    jasmine.clock().tick(11);
    expect(component.time).toBe('0:03');
    expect(component.showWarning).toBeFalsy();

    jasmine.clock().tick(11);
    expect(component.time).toBe('0:02');
    expect(component.showWarning).toBeTruthy();

    jasmine.clock().tick(11);
    expect(component.time).toBe('0:01');
    expect(component.showWarning).toBeTruthy();

    jasmine.clock().tick(11);
    expect(component.time).toBe('0:00');
    expect(component.durationEnds.emit).toHaveBeenCalledWith(true);
    expect(component.showWarning).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationtimerComponent } from './durationtimer.component';

describe('DurationtimerComponent', () => {
  let component: DurationtimerComponent;
  let fixture: ComponentFixture<DurationtimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationtimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationtimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagActiveComponent } from './flag-active.component';

describe('FlagActiveComponent', () => {
  let component: FlagActiveComponent;
  let fixture: ComponentFixture<FlagActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagInactiveComponent } from './flag-inactive.component';

describe('FlagInactiveComponent', () => {
  let component: FlagInactiveComponent;
  let fixture: ComponentFixture<FlagInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

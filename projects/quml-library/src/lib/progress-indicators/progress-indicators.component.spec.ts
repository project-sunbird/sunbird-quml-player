import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndicatorsComponent } from './progress-indicators.component';

describe('ProgressIndicatorsComponent', () => {
  let component: ProgressIndicatorsComponent;
  let fixture: ComponentFixture<ProgressIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqOptionComponent } from './mcq-option.component';

describe('McqOptionComponent', () => {
  let component: McqOptionComponent;
  let fixture: ComponentFixture<McqOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

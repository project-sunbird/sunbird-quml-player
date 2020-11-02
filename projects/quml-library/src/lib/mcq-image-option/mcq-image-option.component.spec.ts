import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqImageOptionComponent } from './mcq-image-option.component';

describe('McqImageOptionComponent', () => {
  let component: McqImageOptionComponent;
  let fixture: ComponentFixture<McqImageOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqImageOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqImageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

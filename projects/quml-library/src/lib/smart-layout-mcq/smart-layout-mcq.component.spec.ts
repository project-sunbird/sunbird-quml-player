import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLayoutMcqComponent } from './smart-layout-mcq.component';

describe('SmartLayoutMcqComponent', () => {
  let component: SmartLayoutMcqComponent;
  let fixture: ComponentFixture<SmartLayoutMcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartLayoutMcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartLayoutMcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

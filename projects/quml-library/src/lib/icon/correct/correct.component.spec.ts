import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectComponent } from './correct.component';

describe('CorrectComponent', () => {
  let component: CorrectComponent;
  let fixture: ComponentFixture<CorrectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

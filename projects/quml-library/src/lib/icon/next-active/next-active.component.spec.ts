import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';

import { NextActiveComponent } from './next-active.component';

describe('NextActiveComponent', () => {
  let component: NextActiveComponent;
  let fixture: ComponentFixture<NextActiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NextActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

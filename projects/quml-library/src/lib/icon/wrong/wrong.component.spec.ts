import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongComponent } from './wrong.component';

describe('WrongComponent', () => {
  let component: WrongComponent;
  let fixture: ComponentFixture<WrongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

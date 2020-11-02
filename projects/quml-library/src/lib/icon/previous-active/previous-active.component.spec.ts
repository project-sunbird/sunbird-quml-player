import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousActiveComponent } from './previous-active.component';

describe('PreviousActiveComponent', () => {
  let component: PreviousActiveComponent;
  let fixture: ComponentFixture<PreviousActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

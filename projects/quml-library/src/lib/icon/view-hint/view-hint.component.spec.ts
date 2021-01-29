import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHintComponent } from './view-hint.component';

describe('ViewHintComponent', () => {
  let component: ViewHintComponent;
  let fixture: ComponentFixture<ViewHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

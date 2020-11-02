import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpagestariconComponent } from './startpagestaricon.component';

describe('StartpagestariconComponent', () => {
  let component: StartpagestariconComponent;
  let fixture: ComponentFixture<StartpagestariconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartpagestariconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpagestariconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

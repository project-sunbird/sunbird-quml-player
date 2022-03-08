import { NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { McqQuestionComponent } from './mcq-question.component';

describe('McqQuestionComponent', () => {
  let component: McqQuestionComponent;
  let fixture: ComponentFixture<McqQuestionComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [McqQuestionComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqQuestionComponent);
    component = fixture.componentInstance;
    component.mcqQuestion = `"<div class='question-body' tabindex='-1'><div class='mcq-title' tabindex='0'><p>Who is the richest person in the world?</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>"`;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit show popup event', () => {
    spyOn(component.showPopup, 'emit');
    component.showQumlPopup();
    expect(component.showPopup.emit).toHaveBeenCalled();
  });
});

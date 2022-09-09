import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { McqOptionComponent } from './mcq-option.component';

describe('McqOptionComponent', () => {
  let component: McqOptionComponent;
  let fixture: ComponentFixture<McqOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [McqOptionComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should reset the options on replay', () => {
    component.replayed = true;
    component.tryAgain = true;
    component.mcqOptions = [{ label: 'option1', selected: true }, { label: 'option2', selected: true }];
    spyOn(component, 'unselectOption');
    component.ngOnChanges();
    expect(component.mcqOptions[0].selected).toBeFalsy();
    expect(component.unselectOption).toHaveBeenCalled();
  });

  it('should unselect the selected option on try again', () => {
    component.mcqOptions = [{ label: 'option1', selected: true }, { label: 'option2', selected: true }];
    component.unselectOption();
    expect(component.selectedOption.length).toBe(0);
  });

  it('should emit the event for the selected option if the index is given', () => {
    const event = new MouseEvent('click');
    const mcqOptions = [{
      "label": "<p>Rahul Gandhi</p>",
      "value": 1
    }, {
      "label": "<p>Narendra Modi</p>",
      "value": 1
    }];
    component.cardinality = "single";
    component.mcqOptions = mcqOptions;
    component.onOptionSelect(event, mcqOptions[1], 1);
    expect(component.mcqOptions[0].selected).toBe(false);
    expect(component.mcqOptions[1].selected).toBe(true);
  });

  it('should emit the event for the selected option if the index is not given', () => {
    const event = new MouseEvent('click');
    const mcqOptions = [{
      "label": "<p>Rahul Gandhi</p>",
      "value": 1
    }, {
      "label": "<p>Narendra Modi</p>",
      "value": 1
    }];
    component.cardinality = "single";
    component.mcqOptions = mcqOptions;
    component.onOptionSelect(event, mcqOptions[1]);
    expect(component.mcqOptions[0].selected).toBe(false);
    expect(component.mcqOptions[1].selected).toBe(true);
  });

  it('should emit the event for the selected option for multiple cardinality', () => {
    let event = new MouseEvent('click');
    event.stopImmediatePropagation = () => {};
    const mcqOptions = [{
      "label": "<p>Rahul Gandhi</p>",
      "value": 1
    }, {
      "label": "<p>Narendra Modi</p>",
      "value": 1
    }];
    component.cardinality = "multiple";
    component.mcqOptions = mcqOptions;
    component.onOptionSelect(event, mcqOptions[1], 1);
    expect(component.mcqOptions[1].selected).toBe(true);
  });

  it('should emit event for the selected option', () => {
    spyOn(component, 'onOptionSelect');
    component.onImageOptionSelected({ option: { 'label': 'option1', value: 1 } });
    expect(component.onOptionSelect).toHaveBeenCalled();
  });

  it('should show the popup', () => {
    spyOn(component.showPopup, 'emit');
    component.showQumlPopup();
    expect(component.showPopup.emit).toHaveBeenCalled();
  });

  it('should emit event on option selected through keyboard', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const mcqOption = {
      "label": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(32,33,36);\">Bill Gates</span></p>",
      "value": 1
    }
    spyOn(event, 'stopPropagation');
    spyOn(component, 'onOptionSelect');
    component.onEnter(event, mcqOption, 1);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.onOptionSelect).toHaveBeenCalledWith(event, mcqOption, 1);
  });
});

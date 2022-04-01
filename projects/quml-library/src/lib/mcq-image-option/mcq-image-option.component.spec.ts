import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { McqImageOptionComponent } from './mcq-image-option.component';

describe('McqImageOptionComponent', () => {
  let component: McqImageOptionComponent;
  let fixture: ComponentFixture<McqImageOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [McqImageOptionComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqImageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.mcqOption = {
      selected: true,
      label: 'Apple'
    }
    expect(component).toBeTruthy();
  });

  it('should show popup', () => {
    component.showQumlPopup = false;
    component.showPopup('<img src="../img.png" >');
    expect(component.showQumlPopup).toBeTruthy();
    expect(component.qumlPopupImage).toBe('<img src="../img.png" >');
  });

  it('should emit event on click', () => {
    spyOn(component.imgOptionSelected, 'emit');
    component.solutions = [{ value: "<h2> this  is a solution </h2>" }];
    const event = new MouseEvent('click');
    component.optionClicked(event, { name: 'option 1' });
    expect(component.imgOptionSelected.emit).toHaveBeenCalled();
  });

  it('should emit event on keypress enter', () => {
    const ev = new KeyboardEvent('keypress', { key: 'Enter' });
    const mcqOption = {
      "answer": true,
      "value": {
        "body": "<p>Jeff Bezos</p>",
        "value": 0
      }
    };
    spyOn(ev, 'stopPropagation');
    spyOn(component, 'optionClicked');
    component.onEnter(ev, mcqOption);
    expect(ev.stopPropagation).toHaveBeenCalled();
    expect(component.optionClicked).toHaveBeenCalledWith(ev, mcqOption);
  });

  it('should open the popup', () => {
    component.showQumlPopup = false;
    component.openPopup('<h1>Optional</h1>');
    expect(component.showQumlPopup).toBeTruthy();
    expect(component.qumlPopupImage).toEqual('<h1>Optional</h1>');
  });

  it('should close the popup', () => {
    component.showQumlPopup = true;
    component.closePopUp();
    expect(component.showQumlPopup).toBeFalsy();

  });
});

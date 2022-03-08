import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    const element = document.createElement('div');
    element.focus();
    spyOn(document, 'querySelector').and.returnValue(element);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    component.ngOnInit();
    expect(document.querySelector).toHaveBeenCalled();
  });

  it('should emit event viewHint', () => {
    spyOn(component.showHint, 'emit');
    component.viewHint();
    expect(component.showHint.emit).toHaveBeenCalledWith({ hint: true });
  });

  it('should emit event viewSolution', () => {
    spyOn(component.showSolution, 'emit');
    component.viewSolution();
    expect(component.showSolution.emit).toHaveBeenCalledWith({ solution: true });
  });

  it('should emit the close event', () => {
    spyOn(component.closeAlert, 'emit');
    component.close('tryAgain');
    expect(component.closeAlert.emit).toHaveBeenCalledWith({ type: 'tryAgain' });
  });


  it('should clean up the subscription', () => {
    const element = document.createElement('div');
    component.previousActiveElement = element;
    component.isFocusSet = false;
    component.subscription = of(1, 2, 3).subscribe();
    spyOn(component.previousActiveElement, 'focus');
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.previousActiveElement.focus).toHaveBeenCalled();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});

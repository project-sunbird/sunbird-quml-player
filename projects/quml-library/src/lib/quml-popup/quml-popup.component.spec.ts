import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { QumlPopupComponent } from './quml-popup.component';

describe('QumlPopupComponent', () => {
  let component: QumlPopupComponent;
  let fixture: ComponentFixture<QumlPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QumlPopupComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QumlPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reduce width to 70%', () => {
    const element = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
    element.appendChild(imgElement);
    spyOn(document, 'getElementById').and.returnValue(element);
    component.ngAfterViewInit();
    expect(element.getElementsByTagName('img')[0].style.width).toBe('70%');
  });

  it('should close the popup', () => {
    spyOn(component.popUpClose, 'emit');
    component.closePopup();
    expect(component.popUpClose.emit).toHaveBeenCalled();
  });
});

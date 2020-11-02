import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QumlPopupComponent } from './quml-popup.component';

describe('QumlPopupComponent', () => {
  let component: QumlPopupComponent;
  let fixture: ComponentFixture<QumlPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QumlPopupComponent ]
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
});

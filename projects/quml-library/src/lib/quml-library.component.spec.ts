import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QumlLibraryComponent } from './quml-library.component';

describe('QumlLibraryComponent', () => {
  let component: QumlLibraryComponent;
  let fixture: ComponentFixture<QumlLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QumlLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QumlLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

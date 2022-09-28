import { waitForAsync,  ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomInComponent } from './zoom-in.component';

describe('ZoomInComponent', () => {
  let component: ZoomInComponent;
  let fixture: ComponentFixture<ZoomInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

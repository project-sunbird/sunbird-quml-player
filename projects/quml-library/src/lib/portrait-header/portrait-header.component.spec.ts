import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitHeaderComponent } from './portrait-header.component';

describe('PortraitHeaderComponent', () => {
  let component: PortraitHeaderComponent;
  let fixture: ComponentFixture<PortraitHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

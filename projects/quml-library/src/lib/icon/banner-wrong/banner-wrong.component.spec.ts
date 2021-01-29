import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerWrongComponent } from './banner-wrong.component';

describe('BannerWrongComponent', () => {
  let component: BannerWrongComponent;
  let fixture: ComponentFixture<BannerWrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerWrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerWrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

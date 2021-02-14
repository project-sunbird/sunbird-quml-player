import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCorrectComponent } from './banner-correct.component';

describe('BannerCorrectComponent', () => {
  let component: BannerCorrectComponent;
  let fixture: ComponentFixture<BannerCorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerCorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

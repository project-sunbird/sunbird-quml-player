import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPlayerComponent } from './section-player.component';

describe('SectionPlayerComponent', () => {
  let component: SectionPlayerComponent;
  let fixture: ComponentFixture<SectionPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpageComponent } from './endpage.component';

describe('EndpageComponent', () => {
  let component: EndpageComponent;
  let fixture: ComponentFixture<EndpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

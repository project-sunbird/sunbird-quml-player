import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqSolutionsComponent } from './mcq-solutions.component';

describe('SolutionsComponent', () => {
  let component: McqSolutionsComponent;
  let fixture: ComponentFixture<McqSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

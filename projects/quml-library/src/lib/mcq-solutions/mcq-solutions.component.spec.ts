import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html.pipe';

import { McqSolutionsComponent } from './mcq-solutions.component';

describe('SolutionsComponent', () => {
  let component: McqSolutionsComponent;
  let fixture: ComponentFixture<McqSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [McqSolutionsComponent, SafeHtmlPipe],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should emit the close event', () => {
    component.solutionVideoPlayer = new ElementRef({ pause() { } });
    spyOn(component.solutionVideoPlayer.nativeElement, 'pause');
    spyOn(component.close, 'emit');
    component.closeSolution();
    expect(component.solutionVideoPlayer.nativeElement.pause).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalledWith({ close: true });
  });
});

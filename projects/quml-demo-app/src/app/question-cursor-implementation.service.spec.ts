import { TestBed } from '@angular/core/testing';

import { QuestionCursorImplementationService } from './question-cursor-implementation.service';

describe('QuestionCursorImplementationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionCursorImplementationService = TestBed.inject(QuestionCursorImplementationService);
    expect(service).toBeTruthy();
  });
});

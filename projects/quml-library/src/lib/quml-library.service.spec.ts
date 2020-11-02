import { TestBed } from '@angular/core/testing';

import { QumlLibraryService } from './quml-library.service';

describe('QumlLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QumlLibraryService = TestBed.get(QumlLibraryService);
    expect(service).toBeTruthy();
  });
});

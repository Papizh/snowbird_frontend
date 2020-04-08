import { TestBed } from '@angular/core/testing';

import { NewDocumentService } from './new-document.service';

describe('NewDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewDocumentService = TestBed.get(NewDocumentService);
    expect(service).toBeTruthy();
  });
});

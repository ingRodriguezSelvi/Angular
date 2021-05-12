import { TestBed } from '@angular/core/testing';

import { ClearDataService } from './clear-data.service';

describe('ClearDataService', () => {
  let service: ClearDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

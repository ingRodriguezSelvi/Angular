import { TestBed } from '@angular/core/testing';

import { MedDataService } from './med-data.service';

describe('MedDataService', () => {
  let service: MedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

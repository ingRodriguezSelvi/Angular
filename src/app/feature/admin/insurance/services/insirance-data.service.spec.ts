import { TestBed } from '@angular/core/testing';

import { InsiranceDataService } from './insirance-data.service';

describe('InsiranceDataService', () => {
  let service: InsiranceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiranceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

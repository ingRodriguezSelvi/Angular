import { TestBed } from '@angular/core/testing';

import { InsiranceService } from './insirance.service';

describe('InsiranceService', () => {
  let service: InsiranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsiranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

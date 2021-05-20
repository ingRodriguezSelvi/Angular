import { TestBed } from '@angular/core/testing';

import { AdminMedService } from './admin-med.service';

describe('AdminMedService', () => {
  let service: AdminMedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

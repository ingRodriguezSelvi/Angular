import { TestBed } from '@angular/core/testing';

import { ManagmentPasswordService } from './managment-password.service';

describe('ManagmentPasswordService', () => {
  let service: ManagmentPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagmentPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

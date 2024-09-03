import { TestBed } from '@angular/core/testing';

import { ServeiAuthService } from './servei.auth.service';

describe('ServeiAuthService', () => {
  let service: ServeiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

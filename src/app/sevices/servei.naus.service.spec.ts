import { TestBed } from '@angular/core/testing';

import { ServeiNausService } from './servei.naus.service';

describe('ServeiNausService', () => {
  let service: ServeiNausService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeiNausService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

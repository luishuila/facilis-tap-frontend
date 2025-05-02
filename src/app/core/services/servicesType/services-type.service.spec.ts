import { TestBed } from '@angular/core/testing';

import { ServicesTypeService } from './services-type.service';

describe('ServicesTypeService', () => {
  let service: ServicesTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

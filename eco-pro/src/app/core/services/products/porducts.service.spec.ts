import { TestBed } from '@angular/core/testing';

import { PorductsService } from './porducts.service';

describe('PorductsService', () => {
  let service: PorductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

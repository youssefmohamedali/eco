import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homelogGuard } from './homelog.guard';

describe('homelogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homelogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

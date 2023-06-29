import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aboutGuard } from './about.guard';

describe('aboutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aboutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

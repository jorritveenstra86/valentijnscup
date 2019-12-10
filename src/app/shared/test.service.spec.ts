import { TestBed } from '@angular/core/testing';

import { TestService } from './test-service.service';

describe('TestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestService = TestBed.get(TestService);
    expect(service).toBeTruthy();
  });
});

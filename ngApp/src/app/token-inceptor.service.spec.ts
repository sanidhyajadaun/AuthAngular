import { TestBed } from '@angular/core/testing';

import { TokenInceptorService } from './token-inceptor.service';

describe('TokenInceptorService', () => {
  let service: TokenInceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

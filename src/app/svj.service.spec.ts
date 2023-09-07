import { TestBed } from '@angular/core/testing';

import { SvjService } from './svj.service';

describe('SvjService', () => {
  let service: SvjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

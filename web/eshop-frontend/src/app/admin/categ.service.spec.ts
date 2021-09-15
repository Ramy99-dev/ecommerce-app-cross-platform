import { TestBed } from '@angular/core/testing';

import { CategService } from './categ.service';

describe('CategService', () => {
  let service: CategService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

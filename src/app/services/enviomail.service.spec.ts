import { TestBed } from '@angular/core/testing';

import { EnviomailService } from './enviomail.service';

describe('EnviomailService', () => {
  let service: EnviomailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviomailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

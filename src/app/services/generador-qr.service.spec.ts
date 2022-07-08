import { TestBed } from '@angular/core/testing';

import { GeneradorQrService } from './generador-qr.service';

describe('GeneradorQrService', () => {
  let service: GeneradorQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

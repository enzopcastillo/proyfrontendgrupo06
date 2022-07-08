import { TestBed } from '@angular/core/testing';

import { DependenciaService } from './dependencia.service';

describe('DependenciaService', () => {
  let service: DependenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

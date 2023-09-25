import { TestBed } from '@angular/core/testing';

import { EncargosService } from './encargos.service';

describe('EncargosService', () => {
  let service: EncargosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncargosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AtividadeUtilService } from './atividade-util.service';

describe('AitividadeUtilService', () => {
  let service: AtividadeUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtividadeUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

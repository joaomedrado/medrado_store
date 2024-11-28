import { TestBed } from '@angular/core/testing';

import { ProdutoDetalhesService } from './produto-detalhes.service';

describe('ProdutoDetalhesService', () => {
  let service: ProdutoDetalhesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoDetalhesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

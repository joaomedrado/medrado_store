import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoDetalhesComponent } from './carrinho-detalhes.component';

describe('CarrinhoDetalhesComponent', () => {
  let component: CarrinhoDetalhesComponent;
  let fixture: ComponentFixture<CarrinhoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

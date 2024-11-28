import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoProdutoComponent } from './carrinho-produto.component';

describe('CarrinhoProdutoComponent', () => {
  let component: CarrinhoProdutoComponent;
  let fixture: ComponentFixture<CarrinhoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

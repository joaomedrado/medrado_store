import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoDetalhesService } from '../produto-detalhes.service';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';
import { SessoesService } from '../../sessoes/sessoes.service';

declare let bootstrap: any;

@Component({
  selector: 'app-carrinho-produto',
  templateUrl: './carrinho-produto.component.html',
  styleUrls: ['./carrinho-produto.component.css']
})
export class CarrinhoProdutoComponent implements OnInit {

  isCarrinhoAberto = false;
  itensCarrinho: any[] = [];
  total: number = 0;

  controleModal = false;
  controleAlert = false;
 
  
  constructor(
    private produtoDetalheService: ProdutoDetalhesService,
    private sessaoService: SessoesService,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
    if (!usuarioLogado) {
      alert('Usuário não está logado. Faça login para realizar a compra.');
      this.router.navigate(["login"]);
    } else {
      this.produtoDetalheService.itensCarrinho$.subscribe(itens => {
        this.itensCarrinho = itens;
      });
      this.produtoDetalheService.carrinhoAberto$.subscribe(estado =>{
        this.isCarrinhoAberto = estado;
      })

    }
  }
  
  metodoFecharCarrinho(){
    return this.produtoDetalheService.fecharCarrinho();
  }
  fecharAlert() {
    this.controleAlert = false;
  }

  metodoControleModal() {
    this.controleModal = true;
  }

  fecharModal() {
    this.controleModal = false;
  }

  toggleCarrinho() {
   this.produtoDetalheService.toggleCarrinho();
    if(this.isCarrinhoAberto){
      this.itensCarrinho = this.produtoDetalheService.obterDadosItensCarrinhoLocalStorage();
    }
  }

  removerItem(id: number) {
    this.produtoDetalheService.removerProduto(id);
  }

  formatarPreco(preco: number): string {
    return this.sessaoService.metodoFormatarPreco(preco);
  }
}

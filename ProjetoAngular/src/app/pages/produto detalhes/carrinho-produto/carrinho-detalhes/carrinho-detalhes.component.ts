import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoDetalhesService } from '../../produto-detalhes.service';
import { AutenticacaoService } from '../../../autenticacao/autenticacao.service';
import { SessoesService } from '../../../sessoes/sessoes.service';

declare let bootstrap: any;
@Component({
  selector: 'app-carrinho-detalhes',
  templateUrl: './carrinho-detalhes.component.html',
  styleUrls: ['./carrinho-detalhes.component.css']
})
export class CarrinhoDetalhesComponent implements OnInit {
  isCarrinhoAberto = false;
  itensCarrinho: any[] = [];
  total: number = 0;
  totalArmazenado: number = 0; 

   endereco =  {
    rua: this.metodoObterUsuario().pessoa.endereco.logradouro,
    cidade: this.metodoObterUsuario().pessoa.endereco.cidade,
    estado: this.metodoObterUsuario().pessoa.endereco.estado,
    pais: this.metodoObterUsuario().pessoa.endereco.pais,
    cep: this.metodoObterUsuario().pessoa.endereco.cep,
    complemento: ""
  };

  dadosPessoais = {
    nome: this.metodoObterUsuario().pessoa.dadosPessoais.nome,
    sobrenome: this.metodoObterUsuario().pessoa.dadosPessoais.sobrenome,
    email: this.metodoObterUsuario().pessoa.dadosPessoais.email,
    telefone: this.metodoObterUsuario().pessoa.dadosPessoais.telefone
  };

  dadosCartao = {
    nomeCartao: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    cpf: this.metodoObterUsuario().pessoa.dadosPessoais.cpf
  };

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
        this.itensCarrinho = this.produtoDetalheService.obterDadosItensCarrinhoLocalStorage();
        this.total = this.produtoDetalheService.calcularTotal();
    }
  }
  carregarCarrinho() {
    this.itensCarrinho = this.produtoDetalheService.obterDadosItensCarrinhoLocalStorage();
    this.total = this.produtoDetalheService.calcularTotal();
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
    this.isCarrinhoAberto = !this.isCarrinhoAberto;
  }


  removerItem(id: number) {
    this.produtoDetalheService.removerProduto(id);
    this.carregarCarrinho(); 
  }

  metodoObterUsuario(){
    const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
    const usuarioId = JSON.parse(usuarioLogado);
    return usuarioId
  }
  metodoComprarProdutoDetalhes() {
    const produto = {
      dadosPessoais: this.dadosPessoais,
      dadosCartao: this.dadosCartao,
      endereco: this.endereco,
      itensCarrinho: this.itensCarrinho
    };

    const usuarioId = this.metodoObterUsuario();

    if (this.dadosCartao.nomeCartao && this.dadosCartao.numeroCartao && this.dadosCartao.validade && this.dadosCartao.cvv && this.dadosCartao.cpf) {
      this.produtoDetalheService.metodoPostCompra(produto, usuarioId.id).subscribe(
        (response) => {
          console.log("Produto comprado com sucesso:", response);
          this.controleAlert = true; 
          this.produtoDetalheService.limparCarrinhoCompleto();
        
        },
        (error) => {
          console.error("Erro ao comprar produto:", error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  validarPasso0(validadorTotalGeral: number) {
    if (validadorTotalGeral !== 0) {
      const nextModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
      nextModal.show();
    } else {
      alert('Não contém produto adicionado no carrinho');
      return;
    }
  }

  validarPasso1() {
    if (this.endereco.rua && this.endereco.cidade && this.endereco.estado && this.endereco.pais && this.endereco.cep) {
      const modalAtual = document.getElementById('exampleModalToggle');
      const nextModal = document.getElementById('exampleModalToggle2');

      const modalInstance = bootstrap.Modal.getInstance(modalAtual);
      modalInstance.hide();

      const nextModalInstance = new bootstrap.Modal(nextModal);
      nextModalInstance.show();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  validarPasso2() {
    if (this.dadosPessoais.nome && this.dadosPessoais.sobrenome && this.dadosPessoais.email && this.dadosPessoais.telefone) {
      const modalAtual = document.getElementById('exampleModalToggle2');
      const nextModal = document.getElementById('exampleModalToggle3');

      const modalInstance = bootstrap.Modal.getInstance(modalAtual);
      modalInstance.hide();

      const nextModalInstance = new bootstrap.Modal(nextModal);
      nextModalInstance.show();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  formatarPreco(preco: number): string {
    return this.sessaoService.metodoFormatarPreco(preco);
  }
}

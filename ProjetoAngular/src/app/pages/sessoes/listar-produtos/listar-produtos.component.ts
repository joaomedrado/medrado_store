import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';
import { SessoesService } from '../sessoes.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  constructor(private sessaoService: SessoesService, private router: Router, private autenticacaoService: AutenticacaoService) { }

  buscaSubscription!: Subscription;
  produtosListados: any[] = [];
  controleAlerta:boolean = false
  ngOnInit(): void {
    this.autenticacaoService.usuarioEstaLogado().subscribe(existe => {
      if (!existe) {
        this.controleAlerta = true
        setTimeout(()=>{
          this.router.navigate(["login"]);
        },3000)
      } else {
        this.sessaoService.metodoAtualizarTermo("iphone");
        this.buscaSubscription = this.sessaoService.termoBusca$.subscribe((novoTermo: string) => {
          this.sessaoService.metodoCaminhoApiMercadoLivre("", novoTermo);
          this.metodoListarProdutos();
        });
      }
    });
  }

  metodoListarProdutos() {
    this.sessaoService.metodoGetMercadoLivre().subscribe((response) => {
      this.produtosListados = response.results;
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';
import { SessoesService } from '../sessoes.service';

@Component({
  selector: 'app-informatica',
  templateUrl: './informatica.component.html',
  styleUrls: ['./informatica.component.css']
})
export class InformaticaComponent implements OnInit {

  constructor(private sessaoService: SessoesService, private router: Router, private autenticacaoService: AutenticacaoService) { }

  buscaSubscription!: Subscription;
  produtosListados: any[] = [];
  controleAlerta: boolean = false
  ngOnInit(): void {
    this.autenticacaoService.usuarioEstaLogado().subscribe((existe) => {
      if (!existe) {
        this.controleAlerta = true
        setTimeout(() => {
          this.router.navigate(["login"]);
        }, 3000)
      } else {
        this.buscaSubscription = this.sessaoService.termoBusca$.subscribe((novoTermo: string) => {
          this.sessaoService.metodoCaminhoApiMercadoLivre("MLB1648", novoTermo);
          this.metodoListarProdutos();
        });
      }
    })
  }

  metodoListarProdutos() {
    this.sessaoService.metodoGetMercadoLivre().subscribe((response) => {
      this.produtosListados = response.results;
    });
  }

}

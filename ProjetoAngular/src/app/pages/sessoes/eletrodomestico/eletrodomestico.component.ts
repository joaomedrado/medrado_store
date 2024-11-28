import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';
import { SessoesService } from '../sessoes.service';


@Component({
  selector: 'app-eletrodomestico',
  templateUrl: './eletrodomestico.component.html',
  styleUrls: ['./eletrodomestico.component.css']
})
export class EletrodomesticoComponent implements OnInit {

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
          this.sessaoService.metodoCaminhoApiMercadoLivre("MLB1574", novoTermo);
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
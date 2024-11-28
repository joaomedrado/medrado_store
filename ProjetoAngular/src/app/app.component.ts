
import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  esconderCabecalhoRodape: boolean = false;

  constructor(private layoutService: LayoutService, private roteador: Router) { }

  ngOnInit(): void {
    this.roteador.events.pipe(
      filter(evento => evento instanceof NavigationEnd)
    ).subscribe(() => {
      const rotaAtual = this.roteador.url;

      if (rotaAtual === "/login" || rotaAtual === "/cadastrar" || rotaAtual === "" || rotaAtual === "/") {
        this.esconderCabecalhoRodape = true;
      } else {
        this.esconderCabecalhoRodape = false;
      }

      this.layoutService.setEsconderCabecalhoRodape(this.esconderCabecalhoRodape);
    });
  }
}

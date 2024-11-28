import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  usuarios:any [] = [];

  ngOnInit(): void {
    this.autenticacaoService.buscarDadosCompras().subscribe(
      (response)=>{
        this.usuarios = response;
      }
    )
  }

  
}

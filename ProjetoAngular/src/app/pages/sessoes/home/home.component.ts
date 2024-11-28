import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

 nomeUsuario:any = ""
 mensagemPadrao:any = ""
 controladorTexto: boolean = false;
 
  ngOnInit(): void {
    this.autenticacaoService.usuarioEstaLogado().subscribe((existe) => {
      if (!existe) {
        alert('Usuário não está logado. Faça login para realizar a compra.');
        this.router.navigate(["login"]);
        this.controladorTexto = false;
      } else{
        const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
        const usuarioNome = JSON.parse(usuarioLogado);
        this.nomeUsuario = usuarioNome.pessoa.dadosPessoais.nome + "!"
        this.mensagemPadrao = "Seja bem vindo,";
        setTimeout(()=>{
          this.controladorTexto = true;
        },100)
       
      }
    })

  }

  
}

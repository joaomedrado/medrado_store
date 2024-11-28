import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/pages/autenticacao/autenticacao.service';
import { SessoesService } from 'src/app/pages/sessoes/sessoes.service';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(private sessaoService: SessoesService, private autenticacaoService: AutenticacaoService, private router: Router) { }

  campoBusca: string = "";

  ngOnInit(): void {

    this.autenticacaoService.usuarioEstaLogado().subscribe((existe)=>{
      if(!existe){
        this.router.navigate(["/login"]);
      }else{
        this.metodoMostrarDados();
      }
    })
   
  
  }

  infoUsuario:any = {}
  mensagemLogo:string = "</Medrado>"
  metodoCampoBusca(){
    let campoProduto = this.campoBusca.trim() === "" ? "iphone" : this.campoBusca
    this.sessaoService.metodoAtualizarTermo(campoProduto);
  }
  metodoSairPerfil(){
    this.autenticacaoService.logout();
    this.router.navigate(["login"])
  }

  metodoMostrarDados(): void {
    const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
    try {
      const usuarioId = JSON.parse(usuarioLogado);

      this.metodoMostrarDadosUsuarios(usuarioId.id);

    } catch (error) {
      console.error('Erro ao analisar ID de usuário:', error);
    }
  }
  metodoMostrarDadosUsuarios(id: string):void{
    this.autenticacaoService.metodoBuscarPorIdUsuario(id).subscribe(
      (response)=>{
        this.infoUsuario = response;
      }
    )

  }
  toggleSearch() {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
        if (searchInput.style.width === '200px') {
            searchInput.style.width = '0';
            searchInput.style.opacity = '0';
        } else {
            searchInput.style.width = '200px';
            searchInput.style.opacity = '1';
            searchInput.focus(); 
        }
    }
}
}


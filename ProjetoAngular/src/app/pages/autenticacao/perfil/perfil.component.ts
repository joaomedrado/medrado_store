import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  infoUsuario: any = {};
  formularioAtualizar: boolean = true;
  senhaVisivel: boolean = false;

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
    this.autenticacaoService.usuarioEstaLogado().subscribe((existe)=>{
      if(!existe){
        alert('Usuário não está logado. Faça login para realizar a compra.');
        this.router.navigate(["login"]);
        
      }else {
        this.metodoMostrarDados();
      }
    })
 
  }
  imagemHover: boolean = false; 

metodoSelecionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        
        const reader = new FileReader();
        reader.onload = () => {
          
            this.infoUsuario.pessoa.imagemPessoa.imagem = reader.result as string;

          
            const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
            const usuarioId = JSON.parse(usuarioLogado);
            const id = usuarioId.id;


            this.autenticacaoService.metodoAtualizarInformaçõesPerfil(id, this.infoUsuario).subscribe({
                next: (response) => {
                    console.log("Imagem atualizada com sucesso", response);
                },
                error: (err) => {
                    console.error("Erro ao atualizar a imagem do usuário", err);
                }
            });
        };
        reader.readAsDataURL(file);
    }
}

  
  metodoFormularioAtualizar(){
    return this.formularioAtualizar = !this.formularioAtualizar;
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
  metodoSenhaVisivel(){
    return this.senhaVisivel = !this.senhaVisivel;
    }
  
  metodoAtulizarDadosPerfil(){
    const usuarioLogado = this.autenticacaoService.obterIdUsuarioLogado();
    const usuarioId = JSON.parse(usuarioLogado); 
    const id = usuarioId.id ; 

    this.autenticacaoService.metodoAtualizarInformaçõesPerfil(id, this.infoUsuario).subscribe({
      next:(response)=>{
        alert("Informações Atualizadas com Sucesso")
        localStorage.setItem(this.autenticacaoService.usuarioLogadoKey,JSON.stringify(response));
        this.formularioAtualizar = true;
      },
      error: (err)=>{
        console.error("Erro ao atualizar informações do Usuário", err);
      }
    })
  }

  
}

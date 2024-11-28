import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }
  controleAlerta:boolean = false;
  controleAlertaSenhaUsuario:boolean = false;
  senhaVisivel: boolean = false;
  pessoa = {
    email: "",
    senha:""
  }
  
  logo:string = "</Medrado>"
  metodoSenhaVisivel(){
  return this.senhaVisivel = !this.senhaVisivel;
  }

  metodoLoginUsuario() {

    this.autenticacaoService.metodoAdmin(this.pessoa.email, this.pessoa.senha).subscribe(
      (response) =>{
        localStorage.setItem("adminLogado", JSON.stringify(response));
        this.controleAlerta = true 
        setTimeout(()=>{
          this.router.navigate(['/admin/dashboard']);
        },1000)
      },
      (error)=>{
        this.autenticacaoService.metodoLogin(this.pessoa.email, this.pessoa.senha).subscribe(
          (response) => {
            localStorage.setItem('usuarioLogado', JSON.stringify(response));
            this.controleAlerta = true 
            setTimeout(()=>{
              this.router.navigate(['/user/home']);
            },1000)
           
          },
          (error) => {
            console.error('Erro ao realizar login:', error.message);
            this.controleAlertaSenhaUsuario = true;
            
            setTimeout(()=>{
              this.controleAlertaSenhaUsuario = false;
            },3000)
          }
        );
      }
    )
  }

}

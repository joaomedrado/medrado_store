import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }
  step = 1;

  imagemSelecionada: File | string | null = null;


  controleAlerta:boolean = false;

  confirmarSenha:any;

  pessoa: any = {
    nome: '',
    sobrenome: '',
    cpf: '',
    telefone:"",
    email: '',
    senha: ''
  };
  endereco: any = {
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais:"",
    cep:""
  };

  imagemPessoa: any = {
    imagem:this.imagemSelecionada
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

 
  metodoSelecionarImagem(imagem: Event): void {
    const input = imagem.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; 
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemSelecionada = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }
  
  metodoCadastrarUsuario(){
    const dadosPessoa = {
      dadosPessoais:this.pessoa,
      endereco: this.endereco,
      imagemPessoa: { imagem: this.imagemSelecionada }
    };
    this.autenticacaoService.metodoPostUsuario(dadosPessoa).subscribe(
      (response) => {
        this.controleAlerta = true
        setTimeout(()=>{
          this.router.navigate(["/login"])
        },3000)
       
      },
      (error) => {
        console.error('Erro ao cadastrar produto:', error);
      }
    )
  }
}

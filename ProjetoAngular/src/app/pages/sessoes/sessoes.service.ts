import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessoesService {

  private caminhoApi: string = "";


  private termoBuscaSubject = new BehaviorSubject<string>("iphone");
  termoBusca$ =  this.termoBuscaSubject.asObservable();

  private installments: any; 

  private readonly installmentsKey:any = "parcelas";
  
  constructor(private http: HttpClient ) {}

  metodoSetCaminhoApi(caminho:string):string {
    this.caminhoApi = caminho;
    return this.caminhoApi;
  }

  metodoCaminhoApiMercadoLivre(categoria:string, produto: string) {
    this.metodoSetCaminhoApi(`https://api.mercadolibre.com/sites/MLB/search?category=${categoria}&q=${produto}`);
  }

  metodoGetMercadoLivre():Observable<any> {
    return  this.http.get<any>(this.caminhoApi);
  }


  metodoBuscarPorIdMercadoLivre(id: string):Observable<any> {
    return this.http.get(`https://api.mercadolibre.com/items/${id}`);
  }



  metodoAtualizarTermo(novoTermo: string) {
    this.termoBuscaSubject.next(novoTermo);
  }

  metodoFormatarPreco(preco:number):string {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }
  
  setProdutosParcelas(installments:any){
     this.installments = installments;
     localStorage.setItem(this.installmentsKey, JSON.stringify(installments))
  }
  getProdutosParcelas():any{
    
    if(!this.installments){
      const  armazenandoIntallments = localStorage.getItem(this.installmentsKey);
      this.installments = armazenandoIntallments ? JSON.parse(armazenandoIntallments) : null;
    }
    return this.installments;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDetalhesService {
  private itensCarrinhoSubject = new BehaviorSubject<any[]>(this.obterDadosItensCarrinhoLocalStorage());
  itensCarrinho$ = this.itensCarrinhoSubject.asObservable();

  private controladorCarrinhoSubject = new BehaviorSubject<boolean>(false);
  carrinhoAberto$ = this.controladorCarrinhoSubject.asObservable();
  
  private readonly caminhoApiCompra: string = "http://localhost:3009/usuario";
  private readonly itensCarrinhoKey: string = "itensCarrinhoKey";
  private readonly totalCarrinhoKey: string = "totalCarrinhoKey"; 

  constructor(private http: HttpClient) { }

  adicionarProduto(produto: any) {
    const itensCarrinho = this.obterDadosItensCarrinhoLocalStorage();
    const novoItem = { ...produto }; 
    itensCarrinho.push(novoItem);
    this.atualizarCarrinho(itensCarrinho);
  }

  removerProduto(id: any) {
    const itensCarrinho = this.obterDadosItensCarrinhoLocalStorage();
    const itensAtualizados = itensCarrinho.filter((item: any) => item.id !== id);
    this.atualizarCarrinho(itensAtualizados);
  }

  limparCarrinhoCompleto(){
    localStorage.removeItem(this.itensCarrinhoKey);
    localStorage.removeItem(this.totalCarrinhoKey);
    this.atualizarCarrinho([]);
  }

  atualizarCarrinho(itens: any[]) {
    const total = this.calcularTotal(); 
    this.itensCarrinhoSubject.next(itens);
    localStorage.setItem(this.itensCarrinhoKey, JSON.stringify(itens));
    localStorage.setItem(this.totalCarrinhoKey, JSON.stringify(total));
  }

  obterDadosItensCarrinhoLocalStorage() {
    const itens = localStorage.getItem(this.itensCarrinhoKey);
    return itens ? JSON.parse(itens) : [];
  }

 

  calcularTotal() {
    const itensCarrinho = this.obterDadosItensCarrinhoLocalStorage(); 
    return itensCarrinho.reduce((acumulador:any, item:any) => {
      const preco = item.price;
      const quantidade = item.quantidade || 1; 
      return acumulador + (preco * quantidade); 
    }, 0);
  }
  metodoPostCompra(produto: any, usuarioId: string): Observable<any> {
    const url = `${this.caminhoApiCompra}/${usuarioId}`;
    return this.http.get(url).pipe(
      switchMap((usuario: any) => {
        const comprasAtualizadas = usuario.pessoa.compras ? [...usuario.pessoa.compras, produto] : [produto];
        const pessoaAtualizada = {
          ...usuario.pessoa,
          compras: comprasAtualizadas
        };
        return this.http.patch(url, { pessoa: pessoaAtualizada }, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }

  metodoBuscarPorIdMercadoLivre(id: string): Observable<any> {
    return this.http.get(`https://api.mercadolibre.com/items/${id}`);
  }

  metodoFormatarPreco(preco: number): string {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }


  toggleCarrinho(){
    const estadoAtual = this.controladorCarrinhoSubject.value;
    this.controladorCarrinhoSubject.next(!estadoAtual);
  }
  
  abrirCarrinho() {
    this.controladorCarrinhoSubject.next(true);
  }
  fecharCarrinho() {
    this.controladorCarrinhoSubject.next(false);
  }
}

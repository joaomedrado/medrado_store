import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessoesService } from 'src/app/pages/sessoes/sessoes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private sessaoService: SessoesService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.produtosListados)
  }
  @Input() produtosListados: any[] = [];
  produtosParcelas: any;
  paginaAtual: number = 1;
  produtosPorPagina: number = 10;

 
  get produtosExibir() {
    const inicio = (this.paginaAtual - 1) * this.produtosPorPagina;
    return this.produtosListados.slice(inicio, inicio + this.produtosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.produtosListados.length / this.produtosPorPagina);
  }

  get numerosPagina() {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  mudarPagina(incremento: number) {
    const novaPagina = this.paginaAtual + incremento;
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas) {
      this.paginaAtual = novaPagina;
    }
    setTimeout(()=>{
      const subSectionTwo = document.getElementById("idSubSectionTwo");
      subSectionTwo?.scrollIntoView({behavior:'smooth'})
    },0)
  }

  mudarParaPagina(numero: number) {
    this.paginaAtual = numero;

    setTimeout(()=>{
      const subSectionTwo = document.getElementById("idSubSectionTwo");
      subSectionTwo?.scrollIntoView({behavior:'smooth'});
    },0)
  }

  metodoListarProdutoPorId(id: string) {
    const installments = this.produtosListados.find((produto) => produto.id === id)?.installments;
    this.sessaoService.setProdutosParcelas(installments);
    this.router.navigate(['/user/detalhes', id]);
  }

  metodoMelhorarQualidadeImagem(imagem: string) {
    return imagem.replace(/\w\.jpg/gi, 'W.jpg');
  }

  formatarPreco(preco: number): string {
    if(preco === null || preco === undefined){
      return "Preço indisponível";
    }
    return this.sessaoService.metodoFormatarPreco(preco);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoDetalhesService } from '../produto-detalhes.service';
import { SessoesService } from '../../sessoes/sessoes.service';



@Component({
  selector: 'app-detalhes-produtos',
  templateUrl: './detalhes-produtos.component.html',
  styleUrls: ['./detalhes-produtos.component.css']
})
export class DetalhesProdutosComponent implements OnInit {


  produtoParcelas:any;
  produto: any;
  produtoAtributos: any[] =[];
  controleDescricao = false;
  contadorNumeroQuantidade = 1;
  controleAlertCarrinho:boolean = false;
  controleAlertCarrinhoCorTam:boolean = false;
  corSelecionada: string | null = null; 
  tamanhoSelecionado:string | null = null;



  constructor(private route: ActivatedRoute, private produtoDetalhesService: ProdutoDetalhesService, private sessaoService: SessoesService) { }

  ngOnInit(): void {
    this.metodoListarPorIdDetalhes();
    
  }
  
 
  metodoMelhorarQualidadeImagem(imagem:string){
    return imagem?.replace(/\w\.jpg/gi, 'W.jpg');
  }

  metodoListarPorIdDetalhes(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoDetalhesService.metodoBuscarPorIdMercadoLivre(id)
      .subscribe((response) => {
       this.produto = response
       console.log(this.produto)
       this.produtoParcelas =  this.sessaoService.getProdutosParcelas()
        if (response && response && response.attributes) {
          this.produtoAtributos.push(...response.attributes);
        } else {
          console.warn('Atributos não encontrados no response:', response);
        }
      });
    }
  }



  metodoControleDescricao(){
    if(this.controleDescricao){
      return this.controleDescricao = false;

    }else{
      this.controleDescricao = true
      return setTimeout(()=>{
        const tabelDescricao = document.getElementById("idTabelaDetalhes");
         tabelDescricao?.scrollIntoView({behavior:'smooth'});
      },0);
    }
   
  }



  adicionarAoCarrinho() {

    if(!this.corSelecionada  && this.obterCoresUnicas().length > 0){
      this.controleAlertCarrinhoCorTam = true;
      setTimeout(()=>{
        this.controleAlertCarrinhoCorTam = false;
      },3000)
    }else{
      const id = Math.random();
      this.produtoDetalhesService.adicionarProduto(
      {
      ...this.produto, id: id, 
      quantidade: this.contadorNumeroQuantidade,
      cor:this.corSelecionada,
      tamanho:this.tamanhoSelecionado
      }
    );
  
      this.controleAlertCarrinho = true; 
      setTimeout(() => {
          this.controleAlertCarrinho = false;
      }, 3000);
  
      this.produtoDetalhesService.abrirCarrinho()
    }

   

  }

  fecharAlertCarrinho(){
    this.controleAlertCarrinho = false;
  }
  formatarPreco(preco:number):string{

    if(preco === null || preco === undefined){
      return "Parcelas Indisponivel"
    }
    return this.produtoDetalhesService.metodoFormatarPreco(preco);
  }


  obterCoresUnicas(): string[] {
    const conjuntoCores  = new Set<string>();
    this.produto.variations.forEach((variation:any) => {
      variation.attribute_combinations.forEach((attribute:any) => {
        if (attribute.id === 'COLOR' && attribute.value_name !== null) {
          conjuntoCores.add(attribute.value_name);
        }
      });
    });
    return Array.from(conjuntoCores );
  }


  selecionarCor(color: string): void {
    this.corSelecionada  = color;
  }
  selecionarTamanho(tamanho: string):void{
    this.tamanhoSelecionado = tamanho;
  }

  
  obterTamanhosDisponiveis(color: string): string[] {
    const conjuntoTamanhos= new Set<string>();
    this.produto.variations.forEach((variation:any) => {
      let correspondeCor  = false;
      variation.attribute_combinations.forEach((attribute:any) => {
        if (attribute.id === 'COLOR' && attribute.value_name === color) {
          correspondeCor  = true;
          
        }
        if (correspondeCor  && attribute.id === 'SIZE') {
          conjuntoTamanhos.add(attribute.value_name);
        }
      });
    });
    return Array.from(conjuntoTamanhos );
    
  }
  }
  


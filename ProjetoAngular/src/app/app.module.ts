import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { HomeComponent } from './pages/sessoes/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ListarProdutosComponent } from './pages/sessoes/listar-produtos/listar-produtos.component';
import { DetalhesProdutosComponent } from './pages/produto detalhes/detalhes-produtos/detalhes-produtos.component';
import { CarrinhoProdutoComponent } from './pages/produto detalhes/carrinho-produto/carrinho-produto.component';
import { InformaticaComponent } from './pages/sessoes/informatica/informatica.component';
import { EletrodomesticoComponent } from './pages/sessoes/eletrodomestico/eletrodomestico.component';
import { ModaComponent } from './pages/sessoes/moda/moda.component';

import { LoginComponent } from './pages/autenticacao/login/login.component';
import { PerfilComponent } from './pages/autenticacao/perfil/perfil.component';
import { CadastrarComponent } from './pages/autenticacao/cadastrar/cadastrar.component';
import { CarrinhoDetalhesComponent } from './pages/produto detalhes/carrinho-produto/carrinho-detalhes/carrinho-detalhes.component';
import { CardComponent } from './componentes/card/card.component';
import { HomepublicoComponent } from './pages/sessoes/home/homepublico/homepublico.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';




@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    HomeComponent,
    ListarProdutosComponent,
    DetalhesProdutosComponent,
    CarrinhoProdutoComponent,
    InformaticaComponent,
    EletrodomesticoComponent,
    ModaComponent,
    LoginComponent,
    PerfilComponent,
    CadastrarComponent,
    CarrinhoDetalhesComponent,
    CardComponent,
    HomepublicoComponent,
    AdministradorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

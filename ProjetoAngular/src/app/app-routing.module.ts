import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/sessoes/home/home.component';
import { ListarProdutosComponent } from './pages/sessoes/listar-produtos/listar-produtos.component';
import { DetalhesProdutosComponent } from './pages/produto detalhes/detalhes-produtos/detalhes-produtos.component';
import { CarrinhoProdutoComponent } from './pages/produto detalhes/carrinho-produto/carrinho-produto.component';
import { InformaticaComponent } from './pages/sessoes/informatica/informatica.component';
import { EletrodomesticoComponent } from './pages/sessoes/eletrodomestico/eletrodomestico.component';
import { ModaComponent } from './pages/sessoes/moda/moda.component';
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { AuthGuard } from './auth.guard'; 
import { PerfilComponent } from './pages/autenticacao/perfil/perfil.component';
import { CadastrarComponent } from './pages/autenticacao/cadastrar/cadastrar.component';
import { CarrinhoDetalhesComponent } from './pages/produto detalhes/carrinho-produto/carrinho-detalhes/carrinho-detalhes.component';
import { HomepublicoComponent } from './pages/sessoes/home/homepublico/homepublico.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { AuthGuardAdmin } from './authAdmin.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastrarComponent},
  { path: '', component: HomepublicoComponent},

  {
    path: 'user', 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'listarProdutos', component: ListarProdutosComponent },
      { path: 'detalhes/:id', component: DetalhesProdutosComponent },
      { path: 'carrinho/:id', component: CarrinhoProdutoComponent },
      { path: 'informatica', component: InformaticaComponent },
      { path: 'eletrodomestico', component: EletrodomesticoComponent },
      { path: 'moda', component: ModaComponent },
      { path: 'perfil', component:PerfilComponent},
      { path: 'carrinho-detalhes', component: CarrinhoDetalhesComponent},
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuardAdmin],
    children: [
      { path: 'dashboard', component: AdministradorComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

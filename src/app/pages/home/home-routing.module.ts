import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CategoriasComponent } from './../../components/categorias/categorias.component';
import { PagosComponent } from './../../components/pagos/pagos.component';
import { ClientesComponent } from './../../components/clientes/clientes.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'categorias',
    component:CategoriasComponent
  },
  {
    path: 'pagos',
    component:PagosComponent
  },
  {
    path: 'clientes',
    component:ClientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

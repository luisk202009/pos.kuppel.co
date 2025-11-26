import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './../../components/clientes/clientes.component';
import { AgregarClientePage } from './agregar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarClientePageRoutingModule {}

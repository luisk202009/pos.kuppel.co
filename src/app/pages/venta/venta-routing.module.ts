import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaPage } from './venta.page';

const routes: Routes = [
  {
    path: '',
    component: VentaPage
  },
  {
    path: 'modal-clientes',
    loadChildren: () => import('./modal-clientes/modal-clientes.module').then( m => m.ModalClientesPageModule)
  },
  {
    path: 'modal-pagos',
    loadChildren: () => import('./modal-pagos/modal-pagos.module').then( m => m.ModalPagosPageModule)
  },
  {
    path: 'modal-facturas-espera',
    loadChildren: () => import('./modal-facturas-espera/modal-facturas-espera.module').then( m => m.ModalFacturasEsperaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaPageRoutingModule {}

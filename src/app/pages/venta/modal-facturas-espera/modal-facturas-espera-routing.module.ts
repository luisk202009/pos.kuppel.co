import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFacturasEsperaPage } from './modal-facturas-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFacturasEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFacturasEsperaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPagosPage } from './modal-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPagosPageRoutingModule {}

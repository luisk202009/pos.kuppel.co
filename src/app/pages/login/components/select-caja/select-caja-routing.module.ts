import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCajaPage } from './select-caja.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCajaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBussinessPage } from './select-bussiness.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBussinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBussinessPageRoutingModule {}

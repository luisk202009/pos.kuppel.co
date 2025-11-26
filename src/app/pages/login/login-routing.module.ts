import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'select-bussiness',
    loadChildren: () => import('./components/select-bussiness/select-bussiness.module').then( m => m.SelectBussinessPageModule)
  },
  {
    path: 'select-caja',
    loadChildren: () => import('./components/select-caja/select-caja.module').then( m => m.SelectCajaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

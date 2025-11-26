import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'init',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agregar-cliente',
    loadChildren: () => import('./pages/agregar-cliente/agregar-cliente.module').then( m => m.AgregarClientePageModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('./pages/venta/venta.module').then( m => m.VentaPageModule)
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./pages/recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  },
  {
    path: 'init',
    loadChildren: () => import('./pages/init/init.module').then( m => m.InitPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/agregar-cliente/agregar-cliente.module').then( m => m.AgregarClientePageModule)
  },
  {
    path: 'imprimir',
    loadChildren: () => import('./pages/imprimir/imprimir.module').then( m => m.ImprimirPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

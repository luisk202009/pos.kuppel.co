import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CategoriasComponent } from './../../components/categorias/categorias.component';

import { HomePageRoutingModule } from './home-routing.module';
import { MesasComponent } from './components/mesas/mesas.component';
import { PlantasComponent } from './components/plantas/plantas.component';
import { TecladoNumericoComponent } from './../../components/teclado-numerico/teclado-numerico.component';
import { ClientesComponent } from './../../components/clientes/clientes.component';
import { AgregarClientePage} from './../agregar-cliente/agregar-cliente.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { XsegundoService } from './../../services/reloj/reloj.service';
import { PagosComponent } from './../../components/pagos/pagos.component';
import { PreciosComponent } from './../../components/precios/precios.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [HomePage, PreciosComponent,CategoriasComponent, MesasComponent, PlantasComponent, TecladoNumericoComponent, ClientesComponent,AgregarClientePage,PagosComponent ],
  providers: [XsegundoService]
})
export class HomePageModule {}

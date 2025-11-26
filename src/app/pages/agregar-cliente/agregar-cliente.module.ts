import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './../../components/clientes/clientes.component';
import { IonicModule } from '@ionic/angular';
import { AgregarClientePageRoutingModule } from './agregar-cliente-routing.module';
import { AgregarClientePage } from './agregar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarClientePageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    ClientesComponent
  ],
  declarations: [AgregarClientePage]
})
export class AgregarClientePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFacturasEsperaPageRoutingModule } from './modal-facturas-espera-routing.module';

import { ModalFacturasEsperaPage } from './modal-facturas-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFacturasEsperaPageRoutingModule
  ],
  declarations: [ModalFacturasEsperaPage]
})
export class ModalFacturasEsperaPageModule {}

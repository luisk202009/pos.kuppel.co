import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCajaPageRoutingModule } from './select-caja-routing.module';

import { SelectCajaPage } from './select-caja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCajaPageRoutingModule
  ],
  declarations: [SelectCajaPage]
})
export class SelectCajaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBussinessPageRoutingModule } from './select-bussiness-routing.module';

import { SelectBussinessPage } from './select-bussiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBussinessPageRoutingModule
  ],
  declarations: [SelectBussinessPage]
})
export class SelectBussinessPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { ModalPagosPageRoutingModule } from './modal-pagos-routing.module';
import { TecladoComponent } from './teclado/teclado.component';
import { ModalPagosPage } from './modal-pagos.page';
import { TecladoCobroComponent} from './../teclado-cobro/teclado-cobro.component';
import { ModalCuotasPage } from './modal-cuotas/modal-cuotas.page';
import { ToMomentFromUnixPipe } from './../../../pipes/to-moment-from-unix.pipe';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPagosPageRoutingModule,
    TecladoCobroComponent,
    ModalPagosPage,
    TecladoComponent
  ],
  declarations: [ModalPagosPage,TecladoComponent,ModalCuotasPage,ToMomentFromUnixPipe],
  exports:[ModalPagosPage]
})
export class ModalPagosPageModule {}

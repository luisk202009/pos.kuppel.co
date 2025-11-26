import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaPageRoutingModule } from './venta-routing.module';
import { ModalPagosPage } from './modal-pagos/modal-pagos.page';
import { VentaPage } from './venta.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { FacturaDinamicaComponent } from './factura-dinamica/factura-dinamica.component';
import { TecladoCobroComponent } from './teclado-cobro/teclado-cobro.component';
import { PaginatorPipe } from 'src/app/pipes/paginator.pipe';
import { TecladoComponent } from './modal-pagos/teclado/teclado.component';
import { ModalCuotasPage } from './modal-pagos/modal-cuotas/modal-cuotas.page';
import { ToMomentFromUnixPipe } from './../../pipes/to-moment-from-unix.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [VentaPage,ToMomentFromUnixPipe, FacturaDinamicaComponent, TecladoCobroComponent, PaginatorPipe,ModalPagosPage,TecladoComponent,ModalCuotasPage]
})
export class VentaPageModule {}

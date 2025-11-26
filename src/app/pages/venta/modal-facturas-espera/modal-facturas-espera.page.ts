import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentSessionObject } from 'src/app/services/session/session.service';
import { FacturasEnEspera } from '../../../services/facturas-en-espera/facturas-en-espera.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-facturas-espera',
  templateUrl: './modal-facturas-espera.page.html',
  styleUrls: ['./modal-facturas-espera.page.scss'],
})
export class ModalFacturasEsperaPage implements OnInit {
  public selected = '';
  public facturasEnEspera = [];
  constructor(private Modals: ModalController) {
    FacturasEnEspera.addOnLoad(()=>this.facturasEnEspera = FacturasEnEspera.get());
    FacturasEnEspera.refresh();
  }

  ngOnInit() {
    console.log(this.facturasEnEspera);
  }

  dissmiss(idFacturaEspera: string, result: any = null){
    this.Modals.dismiss({
      id: idFacturaEspera,
      result: result
    });
  }

  aceptar(){
    this.dissmiss(this.selected);
  }

  cancelar(){
    this.dissmiss(null);
  }

  eliminar(id: string){
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Una vez eliminada no hay vuelta atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        CurrentSessionObject.delete(`${environment.api.app}/facturas-en-espera/${id}`, {}).finally(
          () => {
            FacturasEnEspera.delete(id);
            this.facturasEnEspera = FacturasEnEspera.get();
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
            )
          }
        );
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu factura está a salvo :)',
          'error'
        )
      }
    })
  }

  cargar(id: string){
    let factura = null;

    for (const i in this.facturasEnEspera){
      if (this.facturasEnEspera[i]._id == id){
        factura = this.facturasEnEspera[i];
      }
    }

    if (factura != null)
      this.dissmiss('load', factura);
  }

}

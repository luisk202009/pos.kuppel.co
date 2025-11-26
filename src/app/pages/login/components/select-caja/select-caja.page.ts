import { Component } from '@angular/core';

import { CurrentSessionObject } from '../../../../services/session/session.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-caja',
  templateUrl: './select-caja.page.html',
  styleUrls: ['./select-caja.page.scss'],
})
export class SelectCajaPage {
  public Cajas: Array<any>;
  constructor(private Modals: ModalController) {
    this.Cajas = CurrentSessionObject.Cajas;

    // Selección automática de la empresa cuando sólo hay una
    if (this.Cajas.length < 2){
      this.Cajas[0] === undefined ? this.dismiss(null) : this.dismiss(this.Cajas[0]._id);
    }
  }

  dismiss(idCaja: any) {
    this.Modals.dismiss({
      id: idCaja
    });
  }

  cancelar(){
    CurrentSessionObject.logout();
    this.dismiss(null);
  }

}

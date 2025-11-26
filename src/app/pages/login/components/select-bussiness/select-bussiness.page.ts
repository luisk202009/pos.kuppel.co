import { Component } from '@angular/core';

import { CurrentSessionObject } from '../../../../services/session/session.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-bussiness',
  templateUrl: './select-bussiness.page.html',
  styleUrls: ['./select-bussiness.page.scss'],
})
export class SelectBussinessPage {
  public Bussinesses: Array<any>;
  constructor(private Modals: ModalController) {
    this.Bussinesses = CurrentSessionObject.Bussinesses;

    // Selección automática de la empresa cuando sólo hay una
    if (this.Bussinesses.length === 1){
      this.dismiss(this.Bussinesses[0]._id);
    }
  }

  dismiss(idBussiness: any) {
    this.Modals.dismiss({
      id: idBussiness
    });
  }

  cancelar(){
    CurrentSessionObject.logout();
    this.dismiss(null);
  }
}

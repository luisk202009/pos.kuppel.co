import { Component } from '@angular/core';
import { Plantas } from '../../../../services/plantas/plantas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss'],
})
export class MesasComponent {
  public pisos: Array<any>;
  public planta: number;
  public showSettings: boolean;
  constructor(private router: Router) {
    this.pisos = Plantas.floor;
    this.planta = Plantas.current;
    this.showSettings = false;
  }

  IrAVenta(planta: number, puesto: number, context: string){
    this.router.navigate(['venta'], {
      queryParams: {
        planta:planta,
        context:context,
        puesto:puesto
      }
    });
  }

  switchSettings(){
    this.showSettings = !this.showSettings;
  }

  refresh(){
    this.planta = Plantas.current;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentSessionObject } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.page.html',
  styleUrls: ['./imprimir.page.scss'],
})
export class ImprimirPage implements OnInit {

  public caja: any = {};
  public configuracion: any = {sede:{nombre: ''}};
  public factura: any = {};
  public items: any[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.load();
    
    activatedRoute.queryParams.subscribe(queryParams => {
      this.factura = JSON.parse(queryParams.factura);
      this.items = JSON.parse(queryParams.items);

      if (this.factura.caja.impresion_pos === undefined) {
        this.factura.caja.impresion_pos.frase_final = '';
      }
    });
  }

  async load(){
    const configuraciones = await CurrentSessionObject.get(`${environment.api.app}/configuracion`);
    for(const i in configuraciones){
      this.configuracion = configuraciones[i];
    }
    console.log(this.configuracion);
    const cajas = await CurrentSessionObject.get(`${environment.api.app}/cajas`);


    for (const i in cajas) {
      if (cajas[i]._id == CurrentSessionObject.CajaID){
        this.caja = cajas[i];
      }
    }
  }

  print(){
    window.print();
  }

  ngOnInit() {
  }

}

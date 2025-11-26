import { Component, OnInit, ViewChild } from '@angular/core';
import { FormasPago } from './../../../services/formas-pago/formas-pago.service';
import { TecladoComponent } from './teclado/teclado.component';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FacturaDinamicaComponent } from './../factura-dinamica/factura-dinamica.component';
import { ModalCuotasPage } from './modal-cuotas/modal-cuotas.page';
import { Router } from '@angular/router';
import { CurrentSessionObject } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';
import { env } from 'process';
import { config } from 'rxjs';
import { FacturasEnEspera } from 'src/app/services/facturas-en-espera/facturas-en-espera.service';
@Component({
  selector: 'app-modal-pagos',
  templateUrl: './modal-pagos.page.html',
  styleUrls: ['./modal-pagos.page.scss'],
})
export class ModalPagosPage implements OnInit {
  public formapago: any;
  public valorpagado: any;
  public valorTotal: any;
  public valorcambio: any;
  public formaPagoSelec: any;
  private Factura: FacturaDinamicaComponent;
  public tercero: any;
  public productos: any;
  public impuesto: any;
  public fechaFactura: any;
  public facturaid: any;
  public facturafinal: any;
  public codigoTransaccion: string;

  private configuracionGeneral: any = null;

  @ViewChild('tecladito')
  teclado: TecladoComponent;



  constructor(private navParams: NavParams, private modals: ModalController, private router: Router) {
    this.loadConfig();
    this.valorTotal = navParams.get('total');
    this.tercero = navParams.get('tercero');
    this.productos = navParams.get('productos');
    this.impuesto = navParams.get('impuesto');
    this.valorpagado = '';
    this.fechaFactura = 0;
    this.Factura = new FacturaDinamicaComponent(router);
    this.teclado = new TecladoComponent;

  }

  async loadConfig() {
    const res = await CurrentSessionObject.get(`${environment.api.app}/configuracion`);
    for (const i in res) {
      this.configuracionGeneral = res[i];
    }
  }

  ngOnInit() {
    this.formapago = FormasPago.get();
    this.valorcambio = 0;
  }

  ngAfterViewInit() {

  }

  calcularCambio() {
    this.valorcambio = parseInt(this.teclado.output) - parseInt(this.valorTotal);


    if (this.teclado.output == null || this.teclado.output == '') {
      this.teclado.output = '';
      this.valorcambio = 0;
    }
    if (this.formaPagoSelec != "efectivo" && this.teclado.output > this.valorTotal) {
      setTimeout(() => {
        this.teclado.output = this.valorTotal.toString();
      }, 100);

    }

  }

  numeroEnviado(numero: any) {
    this.valorpagado = numero;
    this.calcularCambio();
  }

  dissmiss(data: any) {
    this.modals.dismiss(data);
  }

  cancelar() {
    this.dissmiss(null);
  }

  getCuentaBancaria(id: string) {
    for (const i in this.formapago) {
      if (this.formapago[i]._id == id) {
        return this.formapago[i]._id;
      }
    }
  }

  async validar() {
    if (this.valorTotal < 0) {
      return;
    }

    if (this.teclado.output < this.valorTotal) {
      return;
    }

    if (!this.formaPagoSelec) {
      return;
    }
    this.Factura.tercero = this.tercero;
    this.Factura.productosFactura = this.productos;
    this.Factura.total = this.valorTotal;
    this.Factura.impuesto = this.impuesto;

    let objFormaPago = null;
    for (const i in this.formapago) {
      if (this.formapago[i]._id == this.formaPagoSelec) {
        objFormaPago = this.formapago[i];
      }
    }

    const info_factura = await this.Factura.enviar();
    this.fechaFactura = info_factura.factura.fecha;
    this.facturafinal = info_factura.factura;

    // Todos los créditos se llevan a una cuenta bancaria o cajón monedero al momento del recaudo
    if (objFormaPago.tipo == 'credito') {
      // Abrimos el modal de las cuotas
      const cuotaData = await this.OpenModalCuotas();
      CurrentSessionObject.post(`${environment.api.app}/creditos-facturas`, cuotaData);
      // Todo el efectivo se va a un cajón monedero
    } else if (objFormaPago.tipo == 'efectivo') {
      const movimiento_contable =
      {
        "fecha": this.fechaFactura,
        "created": Math.ceil(Date.now() / 1000),
        "concepto": `recaudo de factura: ${(await this.Factura.getCaja()).facturacion.prefijo}${(await this.Factura.getConsecutivo())}`,
        "monto": this.Factura.total,
        "medio_pago": objFormaPago,
        "caja": (await this.Factura.getCaja()),
        "tipo_io": "ingreso",
        "tipo_movimiento": "caja",
        "modulo": "facturacion",
        "factura_id": info_factura.factura._id,
        "cierre_caja_id": null
      };
      // Guardamos el movimiento contable
      CurrentSessionObject.post(`${environment.api.app}/movimientos-contables`, movimiento_contable);
      // Todo lo Electrónico tiene una Cuenta asociada en la configuración
    } else if (objFormaPago.tipo == 'electronico') {
      const movimiento_contable = {
        "fecha": this.fechaFactura,
        "created": Math.ceil(Date.now() / 1000),
        "concepto": `recaudo de factura: ${(await this.Factura.getCaja()).facturacion.prefijo}${(await this.Factura.getConsecutivo())}`,
        "monto": this.Factura.total,
        "medio_pago": objFormaPago,
        "caja": (await this.Factura.getCaja()),
        "tipo_io": "ingreso",
        "tipo_movimiento": "banco",
        "modulo": "facturacion",
        "factura_id": info_factura.factura._id,
        "cierre_caja_id": null,
        "cuenta_bancaria": (this.getCuentaBancaria(this.formaPagoSelec)),
        "codigo_transaccion": this.codigoTransaccion
      };
      // Guardamos el movimiento contable
      CurrentSessionObject.post(`${environment.api.app}/movimientos-contables`, movimiento_contable);
    }

    // Implementación de comisiones
    const comisiones = CurrentSessionObject.post(`${environment.api.app}/comisiones/${info_factura.factura._id}`, {});


    console.log(objFormaPago);
    console.log(this.configuracionGeneral);

    this.dissmiss({
      factura: info_factura.factura,
      forma_pago: objFormaPago,
      configuracion: this.configuracionGeneral,
      items: info_factura.items,
      comisiones: comisiones
    });

    this.router.navigate(['/imprimir'], {
      queryParams: {
        factura: JSON.stringify(info_factura.factura),
        items: JSON.stringify(info_factura.items)
      }
    });
  }

  async OpenModalCuotas() {
    const modal = await this.modals.create({
      component: ModalCuotasPage,
      cssClass: 'cuotas',
      componentProps: {
        'total': this.valorTotal,
        'formaspago': this.formapago,
        'fechadeFactura': this.fechaFactura,
        'factura': this.facturafinal
      }
    });
    modal.present();

    const { data: dataPagos } = await modal.onDidDismiss();
    return dataPagos
  }

  getTipoPago() {
    for (const i in this.formapago) {
      if (this.formapago[i]._id == this.formaPagoSelec) {
        return this.formapago[i].tipo;
      }
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

import { CurrentSessionObject } from '../../services/session/session.service';

import { CategoriasPortafolio } from '../../services/categorias-portafolio/categorias-portafolio.service';
import { ProductoServicio } from '../../services/producto-servicio/producto-servicio.service';
import { Terceros } from 'src/app/services/terceros/terceros.service';
import { ModalClientesPage } from './modal-clientes/modal-clientes.page';
import { ModalFacturasEsperaPage } from './modal-facturas-espera/modal-facturas-espera.page';
import { ModalPagosPage } from './modal-pagos/modal-pagos.page';

@Component({
  selector: 'app-venta',
  templateUrl: 'venta.page.html',
  styleUrls: ['venta.page.scss'],
})

export class VentaPage {

  public pageNumber: number = 1;
  public pageSize: number = 4;
  public categorias: any[] = [];
  public productoServicio: any[] = [];
  public rowsFiltered: any[] = [];

  //Variables de la factura dinámica
  public productosFactura: any[] = [];
  public precioTotal: number = 0;
  public impuestoTotal: number = 0;
  public tercero: any = {};

  public switchCategoriasProductos: boolean = false;

  public OutputTeclado: string = '';
  
  private terceros: any[];

  constructor(private router: Router, private toastController: ToastController, private modals: ModalController) {
    //if (!CurrentSessionObject.Logued){
    //  this.router.navigate(['login']);
    //}

    ProductoServicio.addOnLoad(()=>this.productoServicio = ProductoServicio.get());
    CategoriasPortafolio.addOnLoad(()=>this.categorias = CategoriasPortafolio.get());
    Terceros.addOnLoad(()=>this.terceros = Terceros.get());

    ProductoServicio.refresh();
    CategoriasPortafolio.refresh();
    Terceros.refresh();


    this.loadSize();

    for (const i in this.categorias) 
      this.obtenerClasificacion(this.categorias[i]);

      
  }

  private obtenerClasificacion(clasificacion) {
    if (clasificacion.nodes === undefined || clasificacion.nodes.length === 0){
      this.categorias.push(clasificacion);
    }else{
      for (const i in clasificacion.nodes) {
        this.obtenerClasificacion(clasificacion.nodes[i]);
      }
    }
  }

  logout(){
    CurrentSessionObject.logout();
    this.router.navigate(['']);
  }

  loadSize(){
    if (window.innerHeight > window.innerWidth){
      this.pageSize = 4;
    }else{
      this.pageSize = 6;
    }
  }

  paginaAnterior(){
    if (!this.switchCategoriasProductos){
      if (this.pageNumber > 1) this.pageNumber--;
      else  this.pageNumber = Math.ceil((this.categorias.length/this.pageSize));
    }else{
      if (this.pageNumber > 1) this.pageNumber--;
      else  this.pageNumber = Math.ceil((this.rowsFiltered.length/this.pageSize));
    }
    
    this.loadSize();
  }

  paginaSiguiente(){
    if (!this.switchCategoriasProductos){
      if (this.pageNumber < (this.categorias.length/this.pageSize)) this.pageNumber++;
      else this.pageNumber = 1;
    }else{
      if (this.pageNumber < (this.rowsFiltered.length/this.pageSize)) this.pageNumber++;
      else this.pageNumber = 1;
    }
    
    this.loadSize();
  }

  async filtrarItemsPorCategoria(categoriaID: string){
    this.rowsFiltered = [];

    for (const i in this.productoServicio) {
      if (this.productoServicio[i].categoria._id == categoriaID){ // Es de la categoría filtrada
        if (this.productoServicio[i].es_producto){ // Es producto
          if (this.productoServicio[i].producto.es_facturable){ // Es facturable
            var tieneValores = false;
            for (const j in this.productoServicio[i].producto.atributos){ // For en los atriputos
              if (('valores' in this.productoServicio[i].producto.atributos[j])){ // tiene el campo valores (es un producto para crear permutaciones)
                tieneValores = true;
              }
            }

            if (!tieneValores){ // Si es un producto que es permutación o es sencillo
              this.rowsFiltered.push(this.productoServicio[i]);
            }
          }
        }
      }
    }

    this.pageNumber = 1;
    if (this.rowsFiltered.length > 0)
      this.switchCategoriasProductos = true;
    else{
      const toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        header: 'Error:',
        message: 'No se encontró ningún producto con esta categoría.',
        duration: 2000
      });
      toast.present();
    }
  }

  calcularValores(){
    let impuestos = 0;
    let total = 0;

    for (const i in this.productosFactura) {
      var adicionar = (this.productosFactura[i].precio * this.productosFactura[i].cantidad);

      if (!isNaN(adicionar))
        total += (this.productosFactura[i].precio * this.productosFactura[i].cantidad);

      if (this.productosFactura[i].impuesto_incluido){
        var adicionar = (this.productosFactura[i].precio - (this.productosFactura[i].precio / (1 + (this.productosFactura[i].impuesto.porcentaje * 0.01)))) * this.productosFactura[i].cantidad;
        if (!isNaN(adicionar))
          impuestos += adicionar;
      }else{
        var adicionar = (this.productosFactura[i].precio * (this.productosFactura[i].impuesto.porcentaje * 0.01));
        if (!isNaN(adicionar))
          impuestos += adicionar;
      }
    }

    this.impuestoTotal = impuestos;
    this.precioTotal = total;
    console.log(this.precioTotal);
  }

  agregarProducto(id: string){
    let esNuevo = true;
    for (const i in this.productosFactura){
      if (this.productosFactura[i]._id == id){
        this.productosFactura[i].cantidad++;
        esNuevo = false;
      }
    }

    if (esNuevo){
      const productoAAgregar = ProductoServicio.get(id)[0];
      productoAAgregar.cantidad = 1;
      this.productosFactura.push(productoAAgregar);
      document.getElementsByClassName('items-dinamicos')[0].scroll(0,10000);
    }

    this.calcularValores();
  }

  back(){
    this.switchCategoriasProductos = false;
    this.pageNumber = 1;
  }

  changeItem(id){
    id; // Contiene el id del item seleccionado
    this.OutputTeclado = ''; // Libera el output del teclado al cambiar de item
  }

  cleanFactura(event: any){
    this.pageNumber = 1;
    this.loadSize();

    CategoriasPortafolio.refresh();
    ProductoServicio.refresh();
    Terceros.refresh();

    this.rowsFiltered = [];

    //Variables de la factura dinámica
    this.productosFactura = [];
    this.precioTotal = 0;
    this.impuestoTotal = 0;
    this.tercero = {};

    this.switchCategoriasProductos = false;

    this.OutputTeclado = '';
  }

  itemEncontrado(id: string){
    this.agregarProducto(id);
  }

  async openClienteModal(){
    const modal = await this.modals.create({
      component: ModalClientesPage,
      cssClass: 'selectCliente',
      componentProps: {currentTerceroID: this.tercero._id || ''}
    });
    modal.present();

    const { data: dataCliente } = await modal.onDidDismiss();

    if (dataCliente !== undefined && dataCliente.id !== null && dataCliente.id !== ''){
      for (const i in this.terceros) {
        if (this.terceros[i]._id == dataCliente.id){
          this.tercero = this.terceros[i];
        }
      }
    }
  }

  async openFacturasEsperaModal(){
    const modal = await this.modals.create({
      component: ModalFacturasEsperaPage,
      cssClass: 'facturasEspera'
    });
    modal.present();

    const { data: dataFacturaEspera } = await modal.onDidDismiss();

    if (dataFacturaEspera != null){
      if(dataFacturaEspera.id == 'load'){
        let productosFacturaTmp = [];

        // Datos propios
        this.tercero = dataFacturaEspera.result.tercero;
        
        for (const i in this.productoServicio){
          for (const j in dataFacturaEspera.result.items){
            if (dataFacturaEspera.result.items[j].item._id == this.productoServicio[i]._id){
              var sfy = JSON.stringify(this.productoServicio[i]);
              var obj = JSON.parse(sfy);

              obj.impuesto = dataFacturaEspera.result.items[j].impuesto;
              obj.cantidad = dataFacturaEspera.result.items[j].cantidad;
              obj.aplicar_descuento = dataFacturaEspera.result.items[j].info_descuento.aplicar_descuento;
              obj.descuento = dataFacturaEspera.result.items[j].info_descuento.descuento;
              obj.tipo_descuento = dataFacturaEspera.result.items[j].info_descuento.tipo_descuento;
              obj.producto.stock = dataFacturaEspera.result.items[j].item.stock;
              
              productosFacturaTmp.push(obj);
            }
          }
        }

        this.productosFactura = productosFacturaTmp;
        this.calcularValores();
      }
    }
  }

  async openPagosModal(){
    const modal = await this.modals.create({
      component: ModalPagosPage,
      cssClass: 'pagos',
      componentProps: {
        'total': this.precioTotal,
        'tercero': this.tercero,
        'productos': this.productosFactura,
        'impuesto': this.impuestoTotal
      }
    });
    modal.present();

    const { data: dataPagos } = await modal.onDidDismiss();

    console.log(dataPagos);
  }
}

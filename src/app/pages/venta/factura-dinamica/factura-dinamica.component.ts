import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CurrentSessionObject } from '../../../services/session/session.service';

@Component({
    selector: 'app-factura-dinamica',
    templateUrl: './factura-dinamica.component.html',
    styleUrls: ['./factura-dinamica.component.scss'],
})
export class FacturaDinamicaComponent implements OnInit {
    @Input() public productosFactura: any[] = [];
    @Input() total: number = 0;
    @Input() impuesto: number = 0;
    @Input() tercero: any;

    @Output() changeItem: EventEmitter<any> = new EventEmitter();
    @Output() cleanFactura: EventEmitter<any> = new EventEmitter();

    public context: string = null;

    constructor(private router: Router) { }

    ngOnInit() { }

    async dividirCuenta() {
        this.guardar();
    }

    getTercero() {
        return {
            _id: this.tercero._id,
            nombre: `${this.tercero.nombre} ${this.tercero.apellido}`,
            identificacion: `${this.tercero.identificacion}`
        }
    }

    sub_total() {
        let sub_total = 0;

        for (const i in this.productosFactura) {
            var precio = this.productosFactura[i].precio;
            var cantidad = this.productosFactura[i].cantidad;
            var iva = this.productosFactura[i].iva;

            if (this.productosFactura[i].aplicar_impuesto) {
                // Impuestos incluidos
                if (this.productosFactura[i].impuesto_incluido) {
                    sub_total += (precio - iva) * cantidad;
                } else {
                    sub_total += precio * cantidad;
                }
            } else {
                sub_total += precio * cantidad;
            }
        }

        return sub_total;
    };

    totalFactura() {
        let total = 0;
        for (const i in this.productosFactura) {
            if (this.productosFactura[i].impuesto_incluido) {
                total += (this.productosFactura[i].precio * this.productosFactura[i].cantidad) - this.productosFactura[i].descuento;
            } else {
                total += ((this.productosFactura[i].precio + this.productosFactura[i].iva) * this.productosFactura[i].cantidad) - this.productosFactura[i].descuento;
            }
        }

        return total;
    };

    getItems() {
        let items = [];

        const getValorNeto = (productoFactura) => {
            let valorNeto = 0;
            let precioUnitarioConDescuento = 0;
            let valorTotalDescuento = 0;


            if (productoFactura.tipo_descuento == 'porcentaje') {
                // Descuento por porcentaje
                valorTotalDescuento = (productoFactura.descuento / 100) * productoFactura.total;
                precioUnitarioConDescuento = (productoFactura.total - valorTotalDescuento) / productoFactura.cantidad;
            } else {
                // Descuento por valor fijo
                valorTotalDescuento = productoFactura.descuento;
                precioUnitarioConDescuento = (productoFactura.total - valorTotalDescuento) / productoFactura.cantidad;
            }

            if (productoFactura.impuesto_incluido) {
                // Tiene impuesto incluido entonces el valor neto es sacarle el porcentaje de impuesto
            } else {
                // El impuesto se calcula a parte
            }

            return 0;
        }

        const getValorDescuento = (productoFactura) => {
            return 0;
        }

        const getValorImpuesto = (productoFactura) => {
            return 0;
        }

        const getValorTotal = (productoFactura) => {
            return 0;
        }


        for (const i in this.productosFactura) {
            items.push({
                item: {
                    _id: this.productosFactura[i]._id,
                    nombre: this.productosFactura[i].nombre,
                    descripcion: this.productosFactura[i].descripcion,
                    tipo: this.productosFactura[i].tipo,
                    stock: (this.productosFactura[i].producto.stock - this.productosFactura[i].cantidad)
                },

                info_descuento: {
                    aplicar_descuento: this.productosFactura[i].aplicar_descuento,
                    tipo_descuento: this.productosFactura[i].tipo_descuento,
                    descuento: this.productosFactura[i].descuento
                },

                impuesto: this.productosFactura[i].impuesto,

                cantidad: this.productosFactura[i].cantidad,
                valor_unitario: this.productosFactura[i].precio, // Revisar valores de aquí para abajo
                valor_neto: getValorNeto(this.productosFactura[i]),
                valor_descuento: getValorDescuento(this.productosFactura[i]),
                valor_impuesto: getValorImpuesto(this.productosFactura[i]),
                total: getValorTotal(this.productosFactura[i])
            });
        }

        return items;
    };

    total_impuestos = () => {
        let impuestos = 0;
        for (const i in this.productosFactura) {
            impuestos += parseFloat(this.productosFactura[i].iva);
        }

        return impuestos;
    };

    total_descuentos() {
        let descuentos = 0;
        for (const i in this.productosFactura) {
            descuentos += parseFloat(this.productosFactura[i].descuento);
        }

        return descuentos;
    };

    getCajero() {
        return {
            _id: CurrentSessionObject.User._id,
            nombre: CurrentSessionObject.User.nombre,
            identificacion: CurrentSessionObject.User.identificacion
        }
    }

    async getCaja() {
        // Todas las cajas del usuario
        let cajas = await CurrentSessionObject.get(`${environment.api.app}/cajas`);
        let caja = null;

        // Filtramos la caja a la que está conectado el usuario
        for (const i in cajas) {
            if (cajas[i]._id == CurrentSessionObject.CajaID) {
                caja = cajas[i];
            }
        }

        return caja;
    }

    async getConsecutivo() {
        // Obtenemos el consecutivo del prefijo de caja
        let facturas = await CurrentSessionObject.get(`${environment.api.app}/facturas`, { prefijo: (await this.getCaja()).facturacion.prefijo });

        let consecutivo: number = 1;
        for (const i in facturas) {
            if (consecutivo <= facturas[i].consecutivo) {
                consecutivo = (facturas[i].consecutivo + 1);
            }
        }

        return consecutivo;
    }

    // Envia la factura al servidor
    async enviar() {
        const factura = await this.guardar(true);
        const items = JSON.parse(JSON.stringify(factura.items));
        delete factura.items;

        const factura_result = (await CurrentSessionObject.post(`${environment.api.app}/facturas`, factura));

        for (const i in items) {
            items[i].factura_id = factura_result._id;
            CurrentSessionObject.post(`${environment.api.app}/items-facturas`, items[i]);
        }
        
        factura_result.fecha = Math.ceil(Date.now()/1000);
        
        // Retornamos la información de la factura
        return {
            factura: factura_result,
            items: items
        };
        
    }

    // Permite guardar la factura
    async guardar(reading = false) {
        const factura = {
            prefijo: (await this.getCaja()).facturacion.prefijo,
            consecutivo: (await this.getConsecutivo()),
            fecha: parseInt(((Date.now() / 1000) + '')),
            tercero: this.getTercero(),
            cajero: this.getCajero(),
            caja: (await this.getCaja()),
            vendedor: {
                _id: CurrentSessionObject.User._id,
                nombre: CurrentSessionObject.User.nombre
            },
            sub_total: this.sub_total(),//Todo
            total_descuentos: this.total_descuentos(),
            total_impuestos: this.total_impuestos(),
            total: this.totalFactura(),
            clase: "facturacion_normal",
            observaciones: null,
            nombre_temporal: '',
            items: this.getItems(),
            EsFacturaElectronica: false,
            estado: 'pagado',
            conversion_rate: 1,
            currency: "COP"
        };

        if (!reading) {
            await Swal.fire({
                title: 'Ingrese un nombre temporal',
                input: 'text',
                inputLabel: 'Nombre temporal de la factura',
                inputValue: '',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Necesita escribir el nombre del registro!'
                    } else {
                        factura.nombre_temporal = `${value}`;

                        CurrentSessionObject.post(`${environment.api.app}/facturas-en-espera`, factura).finally(() => {
                            // Aquí se debe resetear el estado de la facturación
                            this.cleanFactura.emit(true);
                        });
                    }
                }
            })
        }

        return factura;
    }

    selectItem(id: string): void {
        this.changeItem.emit(id);
        // Desactivar la selección de todo el resto de items:
        for (const i in this.productosFactura) {
            var elementoNoSelect = document.getElementById(this.productosFactura[i]._id);
            elementoNoSelect.style.background = null;
            elementoNoSelect.style.color = null;
            var unidadMedidaNoSelect = elementoNoSelect.children[0].children[1].children[0] as HTMLElement;
            unidadMedidaNoSelect.style.color = null;
        }

        // Item seleccionado
        const elementoSelect = document.getElementById(id);
        elementoSelect.style.background = '#4db2b5';
        elementoSelect.style.color = '#fff';
        const unidadMedida = elementoSelect.children[0].children[1].children[0] as HTMLElement;
        unidadMedida.style.color = '#fff'; // color de unidades
        this.context = id;
    }

    save() { // Guarda la factura en el servidor

    }
}

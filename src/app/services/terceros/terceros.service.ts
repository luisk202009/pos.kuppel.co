import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentSessionObject } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})

/*
  -- Servicio que permitirá no hacer request al servidor cada que se necesita esta información
  -- Más adelante lo instanciaremos y exportaremos una instancia que comparten los diferentes módulos
  -- Mejorando el rendimiento del servidor
*/

class TercerosService {
  // onLoad se llenará con funciones que serán llamadas cuando se carguen los productos y servicios
  private onLoad: Array<any> = [];
  // Aquí se cargarán los productos y servicios
  private terceros: Array<any> = [];

  constructor() {
    // Al iniciar la instancia solicitamos información al API
    if (localStorage.getItem('AccessToken') !== null)
    CurrentSessionObject.get(`${environment.api.app}/terceros`)
    .then((json) => {
      this.terceros = json;
      this.dispatchOnLoad();
    });
  }
  
  // Método que dispara todos los eventos guardados en onLoad
  dispatchOnLoad(){
    for (const i in this.onLoad) {
      if (typeof this.onLoad[i] == "function") this.onLoad[i]();
    }
  }

  // Permite agregar eventos para cuando carguen los datos, retorna el índice del elemento
  addOnLoad(event: Function){
    return (this.onLoad.push(event)-1);
  }

  // Remueve un evento o todos si no se le asigna índice
  removeEvents(index: number = null){
    if (index !== null) delete this.onLoad[index];
    else this.onLoad = [];
  }

  // Solicita datos al servidor y los refresca
  refresh(): void {
    CurrentSessionObject.get(`${environment.api.app}/terceros`)
    .then((json) => {
      this.terceros = json;
      this.dispatchOnLoad();
    });
  }

  // Devuelve un producto o servicio filtrado por ID o devuelve todos si no se provee el parámetro
  get(id: string = null): any[] {
  
    if (id !== null) {
      if (id.toLowerCase() == 'clientes'){
        let clientes: any[] = [];
  
        for (const i in this.terceros) {
          if (this.terceros[i].es_cliente){
            clientes.push(this.terceros[i]);
          }
        }
  
        return clientes;
      }
      
      for (const i in this.terceros){
        if (this.terceros[i]._id == id) return [this.terceros[i]];
      }
    } else return this.terceros;
  }

  // Agrega un producto o servicio al arreglo (no lo guarda en el servidor) TOREVIEW
  add(tercero: any): number{
    const res = (this.terceros.push(tercero)-1);
    this.dispatchOnLoad();
    return res;
  }

  // Permite actualizar un producto o servicio (no lo actualiza en el servidor)
  update(id: string, tercero: any): string{
    for (const i in this.terceros) {
      if (this.terceros[i]._id == id){
        this.terceros[i] = tercero;
        this.dispatchOnLoad();
        return i;
      }
    }
  }

  // Permite eliminar del arreglo un elemento y asigna nuevos índices (No lo elimina en el servidor)
  delete(id: string){
    let tmp: any[] = [];
    for (const i in this.terceros) {
      if (this.terceros[i]._id != id)
        tmp.push(this.terceros[i]);
    }
    this.terceros = tmp;
  }
}

// Exportamos una instancia del servicio para que todas las importaciones 
// importen en mismo objeto sin recargar los datos
export const Terceros: TercerosService = new TercerosService();
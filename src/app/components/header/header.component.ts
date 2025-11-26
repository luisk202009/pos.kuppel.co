import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentSessionObject } from '../../services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  public nombredia: number; // el numero del nombre del dia
  public numdia: number; // el numero del dia
  public arrdias: Array<string>; // arreglo contiene todos los dias
  public dia: string; // el nombre del dia a mostrar

  public nombremes: number; // el numero del nombre del mes
  public arrmes: Array<string>; // el arreglo que contiene los meses
  public mes: string; // el nombre del mes a mostrar

  public year: number;

  public usuario: any;

  constructor(private router: Router) {
    this.arrdias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    this.nombredia = new Date().getDay();
    this.numdia = new Date().getDate();

    this.nombremes = new Date().getMonth();
    this.arrmes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.year = new Date().getFullYear();

    this.dia = this.arrdias[this.nombredia - 1];
    this.mes = this.arrmes[this.nombremes];

    this.usuario = CurrentSessionObject.User;
   }

  logout(){
    CurrentSessionObject.logout();
    this.router.navigate(['login']);
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Swiper } from 'swiper';
import { RelojService,XsegundoService } from './../../services/reloj/reloj.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit,AfterViewInit {
  public productos:Array<any>;
  public swipe: Swiper;
  public pageActual:number;
  public datos$: Observable<RelojService>;
  public hora: string;
  public minutos: string;
  public ampm: string;
  public segundos: string;
  public cantslider:number;
  constructor(private segundo: XsegundoService) { 
    this.pageActual=1;
    this.productos=[{id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"10"},{id:"11"},{id:"12"},{id:"13"},{id:"14"},{id:"15"},{id:"16"},{id:"17"},{id:"18"}];
    this.cantslider=this.productos.length/6;
  }

  ngAfterViewInit(){
    this.swipe= new Swiper('.swiper-container');
  }

  ngOnInit() {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

}






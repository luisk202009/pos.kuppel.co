import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Terceros } from '../../services/terceros/terceros.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})

export class ClientesComponent implements OnInit {
  public clientes: any[] = [];

  constructor() {
    Terceros.addOnLoad(()=>{
      const terceros = Terceros.get();
      for (const i in terceros) {
        if(terceros[i].es_cliente){
          this.clientes.push(terceros[i]);
        }
      }
    })
  }

  ngOnInit() {
    
  }
}

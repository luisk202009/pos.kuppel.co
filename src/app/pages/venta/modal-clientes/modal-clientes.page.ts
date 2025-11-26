import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Terceros } from 'src/app/services/terceros/terceros.service';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.page.html',
  styleUrls: ['./modal-clientes.page.scss'],
})
export class ModalClientesPage implements OnInit {
  public selected: string = '';
  public clientes: any[] = [];
  currentTerceroID: string;

  constructor(private Modals: ModalController) { 
  }

  ngOnInit() {
    const terceros = Terceros.get('clientes');

    for(const i in terceros){
      if (terceros[i].es_cliente){
        this.clientes.push(terceros[i]);
      }
    }

    this.loadClient();
  }

  // Permite marcar el último cliente que ha sido seleccionado de colorcito :)
  loadClient(){
    if (this.currentTerceroID != '' && document.getElementById(this.currentTerceroID) !== null){
      this.selectClient(this.currentTerceroID);
    }else{
      if (this.currentTerceroID !== undefined && (this.selected == '' || this.selected == null))
        setTimeout(()=>{this.loadClient()}, 60);
    }
  }

  selectClient(id: string){
    for (const i in this.clientes){
      if (this.clientes[i]._id == id){
        document.getElementById(this.clientes[i]._id).style.background = 'chocolate';
        document.getElementById(this.clientes[i]._id).style.boxShadow = '0 0 3px #000';
        document.getElementById(this.clientes[i]._id).style.color = '#fff';
        this.selected = this.clientes[i]._id;
      }else{
        document.getElementById(this.clientes[i]._id).style.background = '';
        document.getElementById(this.clientes[i]._id).style.boxShadow = '';
        document.getElementById(this.clientes[i]._id).style.color = '';
      }
    }
  }

  dissmiss(idCliente: string){
    this.Modals.dismiss({
      id: idCliente
    });
  }

  aceptar(){
    this.dissmiss(this.selected);
  }

  cancelar(){
    this.dissmiss(null);
  }
}

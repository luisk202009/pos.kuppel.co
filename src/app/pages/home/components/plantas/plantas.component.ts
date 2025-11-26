import { Component, Input } from '@angular/core';
import { Plantas } from '../../../../services/plantas/plantas.service';
import { MesasComponent } from '../mesas/mesas.component';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.scss'],
})
export class PlantasComponent {
  @Input()
  mesasRef: MesasComponent;

  public plantas: any;
  constructor() {
    this.plantas = Plantas.floor;
  }

  setCurrent(index: number){
    Plantas.setCurrent(index);
    const selected = document.getElementById('planta-' + index);
    selected.style.backgroundColor = '#2d2d2d';
    selected.style.color = '#f0f0f0';

    for (let i = 0; i < Plantas.floor.length; i++){
      if (i !== index){
        const notSelected = document.getElementById('planta-' + i);
        notSelected.style.backgroundColor = '#f0f0f0';
        notSelected.style.color = '#2d2d2d';
      }
    }
    this.mesasRef.refresh();
  }
}

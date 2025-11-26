import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class PlantasService {

  constructor() { }
}

export const Plantas = {
  current: 0,
  setCurrent: (current: number) => Plantas.current = current,
  floor: [
    {
      nombre: 'Planta 1',
      barras: ['Barra 1-1', 'Barra 2-1', 'Barra 3-1'],
      mesas: ['Mesa 1-1', 'Mesa 2-1'],
      balcones: ['Balcón 1', 'Balcón 2', 'Balcón 3', 'Balcón 4']
    },
    {
      nombre: 'Planta 2',
      barras: ['Barra 1-2', 'Barra 2-2'],
      mesas: ['Mesa 1-2', 'Mesa 2-2', 'Mesa 3-2'],
      balcones: ['Balcón 1', 'Balcón 2', 'Balcón 3', 'Balcón 4']
    },
    {
      nombre: 'Planta 3',
      barras: ['Barra 1-3', 'Barra 2-3', 'Barra 3-3'],
      mesas: ['Mesa 1-3', 'Mesa 2-3', 'Mesa 3-3'],
      balcones: ['Balcón 1', 'Balcón 2', 'Balcón 3', 'Balcón 4']
    },
    {
      nombre: 'Terraza',
      barras: ['Barra 1-4', 'Barra 2-4', 'Barra 3-4'],
      mesas: ['Mesa 1-4', 'Mesa 2-4', 'Mesa 3-4', 'Mesa 4-4', 'Mesa 5-4', 'Mesa 6-4','Mesa 1-4', 'Mesa 2-4', 'Mesa 3-4', 'Mesa 4-4', 'Mesa 5-4', 'Mesa 6-4','Mesa 1-4', 'Mesa 2-4', 'Mesa 3-4', 'Mesa 4-4', 'Mesa 5-4', 'Mesa 6-4'],
      balcones: ['Balcón 1', 'Balcón 2', 'Balcón 3', 'Balcón 4']
    },
  ]
};

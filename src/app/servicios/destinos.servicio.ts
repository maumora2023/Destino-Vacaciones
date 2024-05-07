import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { BehaviorSubject } from 'rxjs';
import { Destino } from '../model/destino';

@Injectable({
  providedIn: 'root'
})
export class DestinosServicio {
  private apiKey = '5ae2e3f221c38a28845f05b67e6ef4d74ea092e5d92cdc73011c0992';
  private destinosSource = new BehaviorSubject<Destino[]>([
    { id: 1, name: ' Paises bajos', country: 'Amsterdam', image: 'assets/imagenes/amsterdam.jpg', cost: 2900000 },
    { id: 2, name: 'Nueva Zelanda', country: 'Auckland', image: 'assets/imagenes/nueva zelanda.jpg', cost: 2700000 },
    { id: 3, name: ' Estados Unidos', country: 'San Francisco', image: 'assets/imagenes/estados unidos.jpg', cost: 1000000 },
    { id: 4, name: ' España', country: 'Fuerteventura', image: 'assets/imagenes/españa.jpg', cost: 1110000 },
    { id: 5, name: ' Grecia', country: 'Rodas', image: 'assets/imagenes/grecia.jpg', cost: 3170000 },
    { id: 6, name: ' Tailandia', country: 'Krabi', image: 'assets/imagenes/tailandia.jpg', cost: 4285000 },
    { id: 7, name: ' Portugal', country: 'Lisboa', image: 'assets/imagenes/portugal.jpg', cost: 2100000 },
    { id: 8, name: ' Italia', country: 'Solento', image: 'assets/imagenes/italia.jpg', cost: 4200000 },
    { id: 9, name: ' Tanzania', country: 'Zanzibar', image: 'assets/imagenes/tanzania.jpg', cost: 3000000 },
    { id: 10,name: ' Mexico', country: 'Yucatan', image: 'assets/imagenes/mexico.jpg', cost: 2220000 },
    
  ]);

  currentDestinos = this.destinosSource.asObservable();
  updateDestinoImage: any;

  constructor() {}

  changeTravelCost(id: number, newCost: number) {
    const destinos = [...this.destinosSource.getValue()];
    const index = destinos.findIndex(dest => dest.id === id);
    if (index !== -1) {
      destinos[index].cost = newCost; 
      this.destinosSource.next(destinos);
    }
  }

deleteDestino(id: number) {
  const destinos = this.destinosSource.getValue();
  const updatedDestinos = destinos.filter(destino => destino.id !== id);
  this.destinosSource.next(updatedDestinos);
}

updateDestinos(destinos: Destino[]) {
  this.destinosSource.next(destinos);
}

async getAutosuggest(query: string) {
  try {
    const response = await Http.get({
      url: `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${query}`,
      headers: { 'X-Api-Key': this.apiKey }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

}
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail } from '@ionic/angular/standalone';
import { Destino } from '../../app/model/destino';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FormsModule } from '@angular/forms';
import { DestinosServicio } from '../../app/servicios/destinos.servicio';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar,IonList,IonItem,IonLabel, IonButton,IonIcon,IonThumbnail],
})




export class HomePage {
  searchTerm = '';
  destinos: Destino[] = [];
  filteredDestinos: Destino[] = [];
  apiSearchResults: any[] = []; 
  wishList: Destino[] = []; 

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private destinosServicio: DestinosServicio 
  ) {
    this.destinosServicio.currentDestinos.subscribe(destinos => this.destinos = destinos);
    addIcons({ 
      'camera-outline': cameraOutline, 
      'trash-outline': trashOutline, 
      'airplane-outline': airplaneOutline 
    });
  }

  ngOnInit() {
    this.destinosServicio.currentDestinos.subscribe(destinos => {
      this.destinos = destinos;
      this.filteredDestinos = destinos;
    });
  }
  
  async searchTermChanged(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredDestinos = this.destinos.filter(destino => 
        destino.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      try {
        const results = await this.destinosServicio.getAutosuggest(searchTerm);
        this.apiSearchResults = results;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      this.filteredDestinos = this.destinos;
      this.apiSearchResults = [];
    }
  }
  
  async openCamera(destino: Destino) {
    try {
      const image = await Camera.getPhoto({ 
        quality: 90, 
        allowEditing: true, 
        resultType: CameraResultType.Uri 
      });
  
      const imageUrl = image.webPath; 
  
      if (imageUrl) {
        this.updateDestinoImage(destino.id, imageUrl);
      } else {
        console.error('No se pudo obtener la imagen.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  updateDestinoImage(destinoId: number, imageUrl: string) {
    const index = this.destinos.findIndex(d => d.id === destinoId);
    if (index !== -1) {
      this.destinos[index].image = imageUrl;
      this.destinosServicio.updateDestinos(this.destinos);
    }
  }
  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este destino?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary', handler: () => { console.log('Eliminación cancelada'); } }, 
        { text: 'Eliminar', handler: () => { this.destinosServicio.deleteDestino(id); console.log('Destino eliminado'); } }
      ]
    });

    await alert.present();
  }

  openCostRegistration(destino: Destino) {
    this.navCtrl.navigateForward(['/costo-registro'], { queryParams: { id: destino.id, currentCost: destino.cost } });
  }

  addToWishList(destino: Destino) {
    if (!this.wishList.find(dest => dest.id === destino.id)) {
      this.wishList.push(destino);
      console.log('Destino añadido a la lista de deseos:', destino);
    } else {
      console.log('El destino ya está en la lista de deseos.');
    }
  }

}
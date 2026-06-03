import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { MockDataService } from '../../services/mock-data.service';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  locationOutline,
  callOutline,
  ribbonOutline,
  informationCircleOutline,
  briefcaseOutline,
  timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-about-master-modal',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
  ],
  templateUrl: './about-master-modal.component.html',
  styleUrls: ['./about-master-modal.component.scss'],
})
export class AboutMasterModalComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly mockData = inject(MockDataService);

  protected readonly profile = this.mockData.masterProfile;

  constructor() {
    addIcons({
      closeOutline,
      locationOutline,
      callOutline,
      ribbonOutline,
      informationCircleOutline,
      briefcaseOutline,
      timeOutline,
    });
  }

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }
}

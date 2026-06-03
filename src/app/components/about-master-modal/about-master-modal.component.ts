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
import { addIcons } from 'ionicons';
import {
  closeOutline,
  locationOutline,
  callOutline,
  ribbonOutline,
  informationCircleOutline,
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
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Обо мне</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="about-avatar">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=master&backgroundColor=b6e3f4"
          alt="avatar"
          class="avatar-img"
        />
        <h2>Анна</h2>
        <p class="specialization">Мастер маникюра</p>
      </div>

      <ion-list class="about-list">
        <ion-item>
          <ion-icon name="location-outline" slot="start" color="primary"></ion-icon>
          <ion-label>
            <h3>Город</h3>
            <p>Екатеринбург</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon name="call-outline" slot="start" color="primary"></ion-icon>
          <ion-label>
            <h3>Телефон</h3>
            <p>+7 (912) 345-67-89</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon name="ribbon-outline" slot="start" color="primary"></ion-icon>
          <ion-label>
            <h3>Скиллы</h3>
            <p>
              Маникюр и педикюр<br />
              Гель-лаковое покрытие<br />
              Наращивание ногтей<br />
              Дизайн ногтей<br />
              Укрепление ногтей
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [
    `
      .about-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 0;
        text-align: center;
      }

      .avatar-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 0.75rem;
      }

      .about-avatar h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .specialization {
        margin: 0.25rem 0 0;
        color: var(--ion-color-medium);
        font-size: 0.95rem;
      }

      .about-list {
        margin-top: 1rem;
        border-radius: 12px;
        overflow: hidden;
      }

      .about-list ion-item {
        --padding-start: 16px;
        --padding-end: 16px;
        --padding-top: 12px;
        --padding-bottom: 12px;
        --border-color: var(--ion-color-light-shade);
      }

      .about-list ion-item:last-child {
        --border-width: 0;
      }

      .about-list ion-icon {
        font-size: 24px;
        margin-right: 8px;
      }

      .about-list h3 {
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--ion-color-medium);
        margin: 0 0 4px;
      }

      .about-list p {
        font-size: 1rem;
        color: var(--ion-color-dark);
        margin: 0;
        line-height: 1.5;
      }
    `,
  ],
})
export class AboutMasterModalComponent {
  private readonly modalCtrl = inject(ModalController);

  constructor() {
    addIcons({
      closeOutline,
      locationOutline,
      callOutline,
      ribbonOutline,
      informationCircleOutline,
    });
  }

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }
}

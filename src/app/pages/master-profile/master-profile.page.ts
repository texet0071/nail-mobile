import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { AboutMasterModalComponent } from '../../components/about-master-modal/about-master-modal.component';
import { addIcons } from 'ionicons';
import { logOutOutline, star, informationCircleOutline, chevronForwardOutline } from 'ionicons/icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master-profile',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonAvatar,
    IonItem,
    IonLabel,
  ],
  templateUrl: './master-profile.page.html',
  styleUrls: ['./master-profile.page.scss'],
})
export class MasterProfilePage {
  private readonly authService = inject(AuthService);
  private readonly modalCtrl = inject(ModalController);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ logOutOutline, star, informationCircleOutline, chevronForwardOutline });
  }

  protected get role(): string {
    return this.authService.role();
  }

  protected onLogout(): void {
      this.authService.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
  }

  protected async openAboutModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AboutMasterModalComponent,
    });
    await modal.present();
  }
}

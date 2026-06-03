import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService, Appointment } from '../../services/mock-data.service';
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
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
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
    IonList,
    IonText,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  private readonly mockData = inject(MockDataService);
  private readonly router = inject(Router);

  /** Реактивный список записей (автоматически обновляется при добавлении новых) */
  protected readonly appointments = this.mockData.appointments;

  /** Общая сумма потраченного (реактивно пересчитывается) */
  protected readonly totalSpent = computed(() =>
    this.appointments()
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.amount, 0)
  );

  constructor() {
    addIcons({ arrowBackOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline });
  }

  protected goBack(): void {
    this.router.navigate(['/tabs/news']);
  }

  protected getStatusIcon(status: Appointment['status']): string {
    switch (status) {
      case 'completed': return 'checkmark-circle-outline';
      case 'cancelled': return 'close-circle-outline';
      case 'upcoming': return 'time-outline';
    }
  }

  protected getStatusColor(status: Appointment['status']): string {
    switch (status) {
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'upcoming': return 'warning';
    }
  }

  protected getStatusLabel(status: Appointment['status']): string {
    switch (status) {
      case 'completed': return 'Выполнено';
      case 'cancelled': return 'Отменено';
      case 'upcoming': return 'Предстоит';
    }
  }
}

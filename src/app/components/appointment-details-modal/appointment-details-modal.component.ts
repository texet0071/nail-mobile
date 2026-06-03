import { Component, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Appointment } from '../../services/mock-data.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonLabel,
  IonAvatar,
  IonChip,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  star,
  starOutline,
  callOutline,
  personOutline,
  calendarOutline,
  timeOutline,
  cashOutline,
  chatboxEllipsesOutline,
  briefcaseOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  walletOutline,
  trendingUpOutline,
} from 'ionicons/icons';

interface FakeAppointment {
  id: number;
  client: string;
  service: string;
  price: number;
  time: string;
  status: 'completed' | 'cancelled' | 'upcoming';
  clientRating: number;
}

@Component({
  selector: 'app-appointment-details-modal',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonLabel,
    IonAvatar,
    IonChip,
    IonCard,
    IonCardContent,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Записи за день</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Информация о дате -->
      <div class="date-header">
        <ion-icon name="calendar-outline" color="primary"></ion-icon>
        <h2>{{ selectedDate }}</h2>
      </div>

      <!-- Общая статистика -->
      <div class="stats-row">
        <div class="stat-card">
          <ion-icon name="checkmark-circle-outline" color="success"></ion-icon>
          <div class="stat-info">
            <span class="stat-value">{{ completedCount }}</span>
            <span class="stat-label">Выполнено</span>
          </div>
        </div>
        <div class="stat-card">
          <ion-icon name="close-circle-outline" color="danger"></ion-icon>
          <div class="stat-info">
            <span class="stat-value">{{ cancelledCount }}</span>
            <span class="stat-label">Отменено</span>
          </div>
        </div>
        <div class="stat-card">
          <ion-icon name="trending-up-outline" color="primary"></ion-icon>
          <div class="stat-info">
            <span class="stat-value">{{ totalEarnings }}</span>
            <span class="stat-label">Заработано</span>
          </div>
        </div>
      </div>

      <!-- Список записей -->
      <div class="records-section">
        <h3 class="section-title">Все записи</h3>

        @for (record of fakeRecords; track record.id) {
          <ion-card class="record-card" [class.cancelled]="record.status === 'cancelled'">
            <ion-card-content>
              <div class="record-header">
                <ion-avatar class="record-avatar">
                  <span>{{ record.client.charAt(0) }}</span>
                </ion-avatar>
                <div class="record-client-info">
                  <span class="record-client-name">{{ record.client }}</span>
                  <span class="record-time">{{ record.time }}</span>
                </div>
                <ion-chip [color]="record.status === 'completed' ? 'success' : 'danger'" class="status-chip">
                  <ion-icon
                    [name]="record.status === 'completed' ? 'checkmark-circle-outline' : 'close-circle-outline'"
                  ></ion-icon>
                  <ion-label>{{ record.status === 'completed' ? 'Выполнено' : 'Отменено' }}</ion-label>
                </ion-chip>
              </div>

              <div class="record-details">
                <div class="record-service">
                  <ion-icon name="briefcase-outline" color="primary"></ion-icon>
                  <span>{{ record.service }}</span>
                </div>
                <div class="record-price">
                  <ion-icon name="cash-outline" color="primary"></ion-icon>
                  <span class="price-value">{{ record.price }} ₽</span>
                </div>
              </div>

              <div class="record-rating">
                @for (starIdx of [1,2,3,4,5]; track starIdx) {
                  <ion-icon
                    [name]="starIdx <= record.clientRating ? 'star' : 'star-outline'"
                    [color]="starIdx <= record.clientRating ? 'warning' : 'medium'"
                    class="star-icon"
                  ></ion-icon>
                }
              </div>
            </ion-card-content>
          </ion-card>
        }
      </div>

      <!-- Итоговая сумма -->
      <div class="total-section">
        <ion-icon name="wallet-outline" color="primary"></ion-icon>
        <div class="total-info">
          <span class="total-label">Общий заработок за день</span>
          <span class="total-amount">{{ totalEarnings }} ₽</span>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .date-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      padding: 8px 0;
    }

    .date-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .stats-row {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }

    .stat-card {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: var(--ion-color-light);
      border-radius: 12px;
    }

    .stat-card ion-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: var(--ion-color-dark);
    }

    .stat-label {
      font-size: 11px;
      color: var(--ion-color-medium);
      white-space: nowrap;
    }

    .records-section {
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ion-color-medium);
      text-transform: uppercase;
      margin: 0 0 12px;
      padding-left: 4px;
    }

    .record-card {
      margin-bottom: 12px; /* отступ между карточками */
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .record-card.cancelled {
      opacity: 0.7;
    }

    .record-card ion-card-content {
      padding: 12px;
    }

    .record-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .record-avatar {
      width: 40px;
      height: 40px;
      background: var(--ion-color-primary-tint);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      color: var(--ion-color-primary-contrast);
      flex-shrink: 0;
    }

    .record-client-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .record-client-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--ion-color-dark);
    }

    .record-time {
      font-size: 13px;
      color: var(--ion-color-medium);
    }

    .status-chip {
      margin: 0;
      height: 28px;
      font-size: 11px;
    }

    .record-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .record-service,
    .record-price {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: var(--ion-color-dark);
    }

    .record-service ion-icon,
    .record-price ion-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .price-value {
      font-weight: 700;
      color: var(--ion-color-primary);
    }

    .record-rating {
      display: flex;
      gap: 2px;
    }

    .star-icon {
      font-size: 16px;
    }

    .total-section {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--ion-color-primary-tint);
      border-radius: 12px;
      margin-top: 8px;
      margin-bottom: 16px;
    }

    .total-section ion-icon {
      font-size: 28px;
      flex-shrink: 0;
    }

    .total-info {
      display: flex;
      flex-direction: column;
    }

    .total-label {
      font-size: 13px;
      color: var(--ion-color-dark);
      opacity: 0.8;
    }

    .total-amount {
      font-size: 24px;
      font-weight: 800;
      color: var(--ion-color-primary);
    }
  `],
})
export class AppointmentDetailsModalComponent {
  readonly appointment = input.required<Appointment>();

  private readonly modalCtrl = inject(ModalController);

  protected readonly fakeRecords: FakeAppointment[] = [
    { id: 1, client: 'Анна С.', service: 'Маникюр + покрытие', price: 2500, time: '10:00', status: 'completed', clientRating: 5 },
    { id: 2, client: 'Елена П.', service: 'Педикюр', price: 2200, time: '11:30', status: 'completed', clientRating: 4 },
    { id: 3, client: 'Мария К.', service: 'Наращивание ресниц', price: 1800, time: '13:00', status: 'cancelled', clientRating: 0 },
    { id: 4, client: 'Ольга И.', service: 'Стрижка + укладка', price: 3000, time: '14:30', status: 'completed', clientRating: 5 },
    { id: 5, client: 'Светлана Д.', service: 'Окрашивание волос', price: 4500, time: '16:00', status: 'completed', clientRating: 4 },
  ];

  protected get selectedDate(): string {
    return this.appointment()?.date ?? 'Сегодня';
  }

  protected get completedCount(): number {
    return this.fakeRecords.filter(r => r.status === 'completed').length;
  }

  protected get cancelledCount(): number {
    return this.fakeRecords.filter(r => r.status === 'cancelled').length;
  }

  protected get totalEarnings(): number {
    return this.fakeRecords
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.price, 0);
  }

  constructor() {
    addIcons({
      closeOutline,
      star,
      starOutline,
      callOutline,
      personOutline,
      calendarOutline,
      timeOutline,
      cashOutline,
      chatboxEllipsesOutline,
      briefcaseOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      walletOutline,
      trendingUpOutline,
    });
  }

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }
}

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
  templateUrl: './appointment-details-modal.component.html',
  styleUrls: ['./appointment-details-modal.component.scss'],
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

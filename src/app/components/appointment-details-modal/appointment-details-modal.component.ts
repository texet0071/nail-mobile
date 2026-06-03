import { Component, inject, Input } from '@angular/core';
import { IonCardHeader, IonCardTitle, IonItemDivider, ModalController } from '@ionic/angular/standalone';
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
  walletOutline
} from 'ionicons/icons';

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
    IonChip,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItemDivider,
  ],
  templateUrl: './appointment-details-modal.component.html',
  styleUrls: ['./appointment-details-modal.component.scss'],
})
export class AppointmentDetailsModalComponent {
  @Input() appointment!: Appointment;

  private readonly modalCtrl = inject(ModalController);

  /** Форматированная дата для отображения */
  protected get formattedDate(): string {
    const dateStr = this.appointment?.date;
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  }

  /** Массив [1,2,3,4,5] для отрисовки звёзд рейтинга */
  protected readonly starIndexes = [1, 2, 3, 4, 5];

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
      walletOutline
    });
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

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }
}

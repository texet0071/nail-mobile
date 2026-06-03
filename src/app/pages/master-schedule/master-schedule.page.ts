import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MockDataService, Appointment } from '../../services/mock-data.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
  star,
  starOutline,
  walletOutline,
  trendingUpOutline,
  calendarOutline,
  funnelOutline,
} from 'ionicons/icons';
import { AppointmentDetailsModalComponent } from '../../components/appointment-details-modal/appointment-details-modal.component';
import { DatePipe } from '@angular/common';

type StatusFilter = 'all' | 'completed' | 'cancelled' | 'upcoming';

@Component({
  selector: 'app-master-schedule',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel,
    IonBadge,
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonCardContent,
    DatePipe,
  ],
  templateUrl: './master-schedule.page.html',
  styleUrls: ['./master-schedule.page.scss'],
})
export class MasterSchedulePage {
  private authService = inject(AuthService);
  private mockData = inject(MockDataService);
  private modalCtrl = inject(ModalController);
  private router = inject(Router);

  protected readonly appointments: Appointment[] = this.mockData.getAppointments();

  /** Уникальные даты из записей для фильтра */
  protected readonly availableDates = computed<string[]>(() => {
    const dates = new Set(this.appointments.map(a => a.date));
    return Array.from(dates).sort();
  });

  /** Выбранный фильтр статуса */
  protected readonly selectedStatus = signal<StatusFilter>('all');

  /** Выбранная дата (null = все даты) */
  protected readonly selectedDate = signal<string | null>(null);

  /** Отфильтрованные записи */
  protected readonly filteredAppointments = computed<Appointment[]>(() => {
    let result = this.appointments;

    // Фильтр по статусу
    const status = this.selectedStatus();
    if (status !== 'all') {
      result = result.filter(a => a.status === status);
    }

    // Фильтр по дате
    const date = this.selectedDate();
    if (date !== null) {
      result = result.filter(a => a.date === date);
    }

    return result;
  });

  /** Общий заработок (только выполненные) */
  protected readonly totalEarnings = computed<number>(() => {
    return this.filteredAppointments()
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.amount, 0);
  });

  /** Количество отфильтрованных записей по статусам */
  protected readonly statusCounts = computed(() => ({
    all: this.appointments.length,
    completed: this.appointments.filter(a => a.status === 'completed').length,
    cancelled: this.appointments.filter(a => a.status === 'cancelled').length,
    upcoming: this.appointments.filter(a => a.status === 'upcoming').length,
  }));

  constructor() {
    addIcons({
      logOutOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      timeOutline,
      star,
      starOutline,
      walletOutline,
      trendingUpOutline,
      calendarOutline,
      funnelOutline,
    });
  }

  /** Сбросить все фильтры */
  protected resetFilters(): void {
    this.selectedStatus.set('all');
    this.selectedDate.set(null);
  }

  /** Обработчик изменения фильтра статуса */
  protected onStatusChange(event: Event): void {
    const value = (event as CustomEvent).detail?.value;
    if (value === 'all' || value === 'completed' || value === 'cancelled' || value === 'upcoming') {
      this.selectedStatus.set(value);
    }
  }

  /** Обработчик изменения фильтра даты */
  protected onDateChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    this.selectedDate.set(target?.value || null);
  }

  protected async openDetails(appointment: Appointment): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AppointmentDetailsModalComponent,
      componentProps: {
        appointment,
      },
    });
    await modal.present();
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

  protected onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

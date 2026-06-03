import { Component, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { MockDataService, TimeSlot, Appointment } from '../../services/mock-data.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonDatetime,
  IonIcon,
  IonButton,
  DatetimeChangeEventDetail,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  checkmarkCircleOutline,
  timeOutline,
  briefcaseOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import {DatetimeHighlight, IonDatetimeCustomEvent } from '@ionic/core/components';
import { BookingModalComponent } from '../../components/booking-modal/booking-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonDatetime,
    IonIcon,
    IonButton,
  ],
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  private readonly mockData = inject(MockDataService);
  private readonly toastController = inject(ToastController);
  private readonly modalCtrl = inject(ModalController);

  // Дата и время
  protected readonly selectedDate = signal<string>('');
  protected readonly timeSlots = signal<TimeSlot[]>([]);
  protected readonly selectedTime = signal<string>('');
  protected readonly isAvailable = signal(false);

  // Доступные даты для подсветки в календаре
  protected availableDates: DatetimeHighlight[] = [];

  // Функция проверки, доступна ли дата для записи
  protected isDateEnabled = (dateIsoString: string): boolean => {
    const date = new Date(dateIsoString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Нельзя выбрать прошедшие даты и воскресенья
    if (date < today || date.getDay() === 0) return false;
    return this.mockData.isDateAvailable(dateIsoString.split('T')[0]);
  };

  // Все записи клиента (реактивно, из сервиса)
  protected readonly myAppointments = this.mockData.appointments;

  // ---- Хелперы для статусов (как в ProfilePage) ----

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

  constructor() {
    addIcons({
      calendarOutline,
      checkmarkCircleOutline,
      timeOutline,
      briefcaseOutline,
      closeCircleOutline,
    });
    this.refreshAvailableDates();
  }

  /** Обновляет список доступных дат для подсветки в календаре */
  private refreshAvailableDates(): void {
    const dates: DatetimeHighlight[] = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      if (d.getDay() !== 0 && this.mockData.isDateAvailable(dateStr)) {
        dates.push({
          date: dateStr,
          textColor: 'var(--ion-color-success)',
          backgroundColor: 'rgba(var(--ion-color-success-rgb), 0.2)'
        });
      }
    }
    this.availableDates = dates;
  }


  /** Обработчик выбора даты в ion-datetime -> обновляет слоты и открывает модалку */
  protected async onDateChange(event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>): Promise<void> {
    const value = event.detail.value;
    const dateStr = typeof value === 'string' ? value.split('T')[0] : '';
    if (!dateStr) return;

    // Обновляем слоты на странице (старая логика)
    this.selectedDate.set(dateStr);
    const slots = this.mockData.getTimeSlots(dateStr);
    this.timeSlots.set(slots);
    this.isAvailable.set(slots.some(s => s.available));
    this.selectedTime.set('');

    // Открываем модальное окно с пошаговой записью
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: {
        selectedDate: dateStr,
      },
    });

    await modal.present();

    // Обрабатываем результат закрытия модалки
    const { data } = await modal.onDidDismiss();
    if (data) {
      // Добавляем новую запись в реактивный список сервиса
      this.mockData.addAppointment({
        service: data.service.name,
        client: data.name || 'Клиент',
        clientPhone: data.phone || '',
        clientRating: 0,
        clientComment: data.comment || '',
        master: 'Анна С.',
        date: data.date,
        time: data.time,
        amount: data.service.price,
        status: 'upcoming',
      });
    }
  }

  protected selectTime(time: string): void {
    this.selectedTime.set(time);
  }

  protected formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  /** Обработчик кнопки «Записаться» — бронирует выбранный слот */
  protected onBook(): void {
    if (!this.selectedDate() || !this.selectedTime()) return;

    const dateStr = this.selectedDate();
    const timeStr = this.selectedTime();

    // Показываем toast подтверждения и добавляем запись
    this.toastController.create({
      message: `Вы записаны на ${this.formatDate(dateStr)} в ${timeStr}`,
      duration: 3000,
      color: 'success',
      position: 'bottom',
    }).then(toast => toast.present());

    // Сбрасываем выбранное время после записи
    this.selectedTime.set('');
  }
}

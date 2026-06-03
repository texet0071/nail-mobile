import { Component, inject, signal, computed, Input, afterNextRender } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular/standalone';
import { MockDataService, TimeSlot, ServiceItem } from '../../services/mock-data.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  checkmarkCircleOutline,
  timeOutline,
  briefcaseOutline,
  callOutline,
  personOutline,
  chatboxEllipsesOutline,
  arrowBackOutline,
  arrowForwardOutline,
  copyOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-booking-modal',
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
    IonInput,
    IonTextarea,
    IonFooter
  ],
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly mockData = inject(MockDataService);
  private readonly toastCtrl = inject(ToastController);

  /** Входной параметр — выбранная дата (через componentProps) */
  @Input() selectedDate: string = '';

  /** Текущий шаг (1, 2, 3) */
  protected readonly step = signal<1 | 2 | 3>(1);

  // Шаг 1 — выбор времени
  protected readonly timeSlots = signal<TimeSlot[]>([]);
  protected readonly selectedTime = signal<string>('');

  // Шаг 2 — выбор услуг (мульти-селект)
  protected readonly services = signal<ServiceItem[]>([]);
  protected readonly selectedServices = signal<ServiceItem[]>([]);

  /** Общая стоимость выбранных услуг */
  protected readonly totalPrice = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.price, 0)
  );

  // Шаг 3 — контактные данные
  protected readonly phone = signal<string>('');
  protected readonly name = signal<string>('');
  protected readonly comment = signal<string>('');

  constructor() {
    addIcons({
      closeOutline,
      checkmarkCircleOutline,
      timeOutline,
      briefcaseOutline,
      callOutline,
      personOutline,
      chatboxEllipsesOutline,
      arrowBackOutline,
      arrowForwardOutline,
      copyOutline,
    });

    // Загружаем данные после первой проверки представления,
    // чтобы избежать ExpressionChangedAfterItHasBeenCheckedError
    afterNextRender(() => {
      if (this.selectedDate) {
        this.timeSlots.set(this.mockData.getTimeSlots(this.selectedDate));
      }
      this.services.set(this.mockData.getServices());
    });
  }

  // ---- Навигация по шагам ----

  protected goToStep(s: 1 | 2 | 3): void {
    this.step.set(s);
  }

  protected nextStep(): void {
    const current = this.step();
    if (current === 1 && !this.selectedTime()) return;
    if (current === 2 && this.selectedServices().length === 0) return;
    this.step.set((current + 1) as 1 | 2 | 3);
  }

  protected prevStep(): void {
    const current = this.step();
    if (current > 1) this.step.set((current - 1) as 1 | 2 | 3);
  }

  // ---- Шаг 1 ----

  protected selectTime(time: string): void {
    this.selectedTime.set(time);
    this.nextStep();
  }

  // ---- Шаг 2 ----

  protected toggleService(service: ServiceItem): void {
    this.selectedServices.update(list => {
      const index = list.findIndex(s => s.id === service.id);
      if (index === -1) {
        return [...list, service];
      }
      // Убираем из списка (деселект)
      return list.filter(s => s.id !== service.id);
    });
  }

  protected isServiceSelected(service: ServiceItem): boolean {
    return this.selectedServices().some(s => s.id === service.id);
  }

  // ---- Шаг 3 ----

  protected copyFromProfile(): void {
    // Для демонстрации копируем заранее заданные данные "из профиля"
    this.phone.set('+7 (912) 345-67-89');
    this.name.set('Екатерина');
  }

  // ---- Отправка ----

  protected async onSubmit(): Promise<void> {
    const time = this.selectedTime();
    const selected = this.selectedServices();
    const phoneValue = this.phone();
    const nameValue = this.name();

    if (!time || selected.length === 0 || !phoneValue || !nameValue) return;

    const serviceNames = selected.map(s => s.name).join(', ');
    const total = this.totalPrice();

    // Показываем уведомление об успешной записи
    const toast = await this.toastCtrl.create({
      message: `✅ Вы записаны!\n${serviceNames}\n${this.selectedDate} в ${time}\nСумма: ${total} ₽`,
      duration: 4000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    this.modalCtrl.dismiss({
      date: this.selectedDate,
      time,
      services: selected,
      totalPrice: total,
      phone: phoneValue,
      name: nameValue,
      comment: this.comment(),
    });
  }

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }

  // ---- Хелперы ----

  protected formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  protected getStepTitle(): string {
    switch (this.step()) {
      case 1: return 'Выберите время';
      case 2: return 'Выберите услугу';
      case 3: return 'Контактные данные';
    }
  }
}

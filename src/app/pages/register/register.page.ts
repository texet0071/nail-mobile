import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  RegisterData,
  UserRole,
} from '../../services/auth.service';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

const PROFESSIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'nail_master', label: '💅 Мастер маникюра' },
  { value: 'hair_stylist', label: '💇 Парикмахер-стилист' },
  { value: 'makeup_artist', label: '💄 Визажист' },
  { value: 'massage_therapist', label: '💆 Массажист' },
  { value: 'cosmetologist', label: '🧴 Косметолог' },
  { value: 'brow_master', label: '✨ Бровист' },
  { value: 'lash_maker', label: '👁 Лэшмейкер' },
  { value: 'tattoo_artist', label: '🎨 Тату-мастер' },
  { value: 'spa_specialist', label: '🌿 SPA-специалист' },
  { value: 'barber', label: '💈 Барбер' },
] as const;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast,
    IonSelect,
    IonSelectOption
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly professions = PROFESSIONS;

  protected readonly name = signal('');
  protected readonly phone = signal('');
  protected readonly email = signal('');
  protected readonly profession = signal('');
  protected readonly role = signal<UserRole>('client');
  protected readonly toastMessage = signal('');
  protected readonly showToast = signal(false);

  protected onNameChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.name.set(typeof value === 'string' ? value : '');
  }

  protected onPhoneChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.phone.set(typeof value === 'string' ? value : '');
  }

  protected onEmailChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.email.set(typeof value === 'string' ? value : '');
  }

  protected onProfessionChange(event: Event): void {
    const value = (event.target as HTMLIonSelectElement).value;
    this.profession.set(typeof value === 'string' ? value : '');
  }

  protected onRoleChange(role: UserRole): void {
    this.role.set(role);
  }

  protected onSubmit(): void {
    const name = this.name().trim();
    const phone = this.phone().trim();
    const email = this.email().trim();
    const profession = this.profession();

    if (!name || !phone || !email || !profession) {
      this.toastMessage.set('Пожалуйста, заполните все поля');
      this.showToast.set(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.toastMessage.set('Введите корректный email');
      this.showToast.set(true);
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s()-]/g, ''))) {
      this.toastMessage.set('Введите корректный номер телефона');
      this.showToast.set(true);
      return;
    }

    const data: RegisterData = {
      name,
      phone,
      email,
      profession,
      role: this.role(),
    };

    const success = this.authService.register(data);

    if (!success) {
      this.toastMessage.set(
        'Пользователь с таким email или телефоном уже существует'
      );
      this.showToast.set(true);
      return;
    }

    this.name.set('');
    this.phone.set('');
    this.email.set('');
    this.profession.set('');
    this.role.set('client');

    this.toastMessage.set('Регистрация успешна! Выполните вход.');
    this.showToast.set(true);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  protected goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

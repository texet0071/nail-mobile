import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonToast],
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly email = signal('');
  protected readonly toastMessage = signal('');
  protected readonly showToast = signal(false);
  protected readonly submitted = signal(false);

  protected onEmailChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.email.set(typeof value === 'string' ? value : '');
  }

  protected onSubmit(): void {
    const email = this.email().trim();

    if (!email) {
      this.toastMessage.set('Введите email');
      this.showToast.set(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.toastMessage.set('Введите корректный email');
      this.showToast.set(true);
      return;
    }

    const found = this.authService.resetPassword(email);

    if (found) {
      this.submitted.set(true);
      this.toastMessage.set(
        'Инструкции по восстановлению пароля отправлены на указанный email'
      );
    } else {
      this.toastMessage.set(
        'Пользователь с таким email не найден. Возможно, вы ещё не зарегистрированы.'
      );
    }
    this.showToast.set(true);
  }

  protected goToLogin(): void {
    this.router.navigate(['/login']);
  }

  protected goToRegister(): void {
    this.router.navigate(['/register']);
  }
}

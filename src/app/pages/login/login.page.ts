import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoVk, paperPlaneOutline, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast,
    IonSegment,
    IonSegmentButton,
    IonIcon,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ logoVk, paperPlaneOutline, logoGoogle });
  }

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly selectedRole = signal<UserRole>('client');
  protected readonly toastMessage = signal('');
  protected readonly showToast = signal(false);

  protected onEmailChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.email.set(typeof value === 'string' ? value : '');
  }

  protected onPasswordChange(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.password.set(typeof value === 'string' ? value : '');
  }

  protected onRoleChange(event: Event): void {
    const value = (event.target as HTMLIonSegmentElement).value;
    this.selectedRole.set((value as UserRole) || 'client');
  }

  protected onLogin(): void {
    const email = this.email().trim();
    const password = this.password().trim();

    if (!email || !password) {
      this.toastMessage.set('Пожалуйста, введите email и пароль');
      this.showToast.set(true);
      return;
    }

    this.authService.login(this.selectedRole());

    if (this.selectedRole() === 'master') {
      this.router.navigate(['/master-tabs/schedule']);
    } else {
      this.router.navigate(['/tabs/news']);
    }
  }

  protected onRegister(): void {
    this.router.navigate(['/register']);
  }

  protected onRecoverAccount(): void {
    this.router.navigate(['/forgot-password']);
  }

  protected onVkLogin(): void {
    this.toastMessage.set('Вход через VK будет доступен позже');
    this.showToast.set(true);
  }

  protected onTelegramLogin(): void {
    this.toastMessage.set('Вход через Telegram будет доступен позже');
    this.showToast.set(true);
  }

  protected onGoogleLogin(): void {
    this.toastMessage.set('Вход через Google будет доступен позже');
    this.showToast.set(true);
  }
}

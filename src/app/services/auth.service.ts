import { Injectable, signal } from '@angular/core';

export type UserRole = 'client' | 'master';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal(false);
  private readonly roleSignal = signal<UserRole>('client');

  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly role = this.roleSignal.asReadonly();

  login(role: UserRole): void {
    this.roleSignal.set(role);
    this.isAuthenticatedSignal.set(true);
  }

  logout(): void {
    this.roleSignal.set('client');
    this.isAuthenticatedSignal.set(false);
  }
}

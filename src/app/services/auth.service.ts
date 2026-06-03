import { Injectable, signal } from '@angular/core';

export type UserRole = 'client' | 'master';

export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  profession: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal(false);
  private readonly roleSignal = signal<UserRole>('client');
  private readonly registeredUsersSignal = signal<RegisterData[]>([]);

  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly role = this.roleSignal.asReadonly();
  readonly registeredUsers = this.registeredUsersSignal.asReadonly();

  login(role: UserRole): void {
    this.roleSignal.set(role);
    this.isAuthenticatedSignal.set(true);
  }

  register(data: RegisterData): boolean {
    const users = this.registeredUsersSignal();
    const exists = users.some(
      (u) => u.email === data.email || u.phone === data.phone
    );
    if (exists) {
      return false;
    }
    this.registeredUsersSignal.set([...users, data]);
    return true;
  }

  resetPassword(email: string): boolean {
    const users = this.registeredUsersSignal();
    const userExists = users.some((u) => u.email === email);
    return userExists;
  }

  logout(): void {
    this.roleSignal.set('client');
    this.isAuthenticatedSignal.set(false);
  }
}

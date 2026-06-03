import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../services/auth.service';

export const authGuard = (route?: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  const requiredRole = route?.data?.['role'] as UserRole | undefined;

  if (requiredRole && authService.role() !== requiredRole) {
    // Если роль не совпадает — редирект на соответствующий раздел
    if (authService.role() === 'master') {
      return router.parseUrl('/master-tabs/schedule');
    }
    return router.parseUrl('/tabs/news');
  }

  return true;
};

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    canActivate: [authGuard],
    data: { role: 'client' },
    children: [
      {
        path: 'news',
        loadComponent: () => import('./pages/news/news.page').then((m) => m.NewsPage),
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar.page').then((m) => m.CalendarPage),
      },
      {
        path: 'chat',
        loadComponent: () => import('./pages/chat/chat.page').then((m) => m.ChatPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/news',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'master-tabs',
    loadComponent: () => import('./pages/master-tabs/master-tabs.page').then((m) => m.MasterTabsPage),
    canActivate: [authGuard],
    data: { role: 'master' },
    children: [
      {
        path: 'schedule',
        loadComponent: () => import('./pages/master-schedule/master-schedule.page').then((m) => m.MasterSchedulePage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/master-profile/master-profile.page').then((m) => m.MasterProfilePage),
      },
      {
        path: '',
        redirectTo: '/master-tabs/schedule',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

import { Routes } from '@angular/router';
import { authenticatedGuard } from '@auth/guards/authenticated.guard';
import { notAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //canMatch: [notAuthenticatedGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
    canMatch: [authenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: 'player-registration',
    loadComponent: () =>
      import(
        './views/players/player-registration/player-registration.component'
      ).then((m) => m.PlayerRegistrationComponent),
    canActivate: [authGuard],
  },
  {
    path: 'players',
    loadComponent: () =>
      import('./views/players/players-list/players-list.component').then(
        (m) => m.PlayersListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'players/:id',
    loadComponent: () =>
      import('./views/players/player-actualization/player.component').then(
        (m) => m.PlayerComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'players-import',
    loadComponent: () =>
      import('./views/players/players-import/players-import.component').then(
        (m) => m.PlayersImportComponent
      ),
    canActivate: [authGuard, roleGuard], // Solo para "Administrador"
  },
  {
    path: 'players-export',
    loadComponent: () =>
      import('./views/players/players-export/players-export.component').then(
        (m) => m.PlayersExportComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './views/users/user-registration/user-registration.component'
      ).then((m) => m.UserRegistrationComponent),
    canActivate: [roleGuard], // Solo para "Administrador"
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full',
  },
];

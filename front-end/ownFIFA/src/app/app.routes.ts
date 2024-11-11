import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './interfaces/user.interface';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard], // Protege la ruta y todas sus hijas
    children: [
      {
        path: 'player-registration',
        loadComponent: () =>
          import(
            './views/dashboard/players/player-registration/player-registration.component'
          ).then((m) => m.PlayerRegistrationComponent),
      },
      {
        path: 'players',
        loadComponent: () =>
          import(
            './views/dashboard/players/players-list/players-list.component'
          ).then((m) => m.PlayersListComponent),
      },
      {
        path: 'players/:id',
        loadComponent: () =>
          import(
            './views/dashboard/players/player-actualization/player.component'
          ).then((m) => m.PlayerComponent),
      },
      {
        path: 'players-import',
        loadComponent: () =>
          import(
            './views/dashboard/players/players-import/players-import.component'
          ).then((m) => m.PlayersImportComponent),
        canActivate: [roleGuard], // aplica el guard para limitar el acceso por rol
        data: { role: Role.ADMINISTRADOR },
      },
      {
        path: 'players-export',
        loadComponent: () =>
          import(
            './views/dashboard/players/players-export/players-export.component'
          ).then((m) => m.PlayersExportComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './views/users/user-registration/user-registration.component'
      ).then((m) => m.UserRegistrationComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: Role.ADMINISTRADOR },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/users/login/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
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
          import('./views/dashboard/players/players-list/players-list.component').then(
            (m) => m.PlayersListComponent
          ),
      },
      {
        path: 'players/:id',
        loadComponent: () =>
          import('./views/dashboard/players/player-actualization/player.component').then(
            (m) => m.PlayerComponent
          ),
      },
      {
        path: 'players-import',
        loadComponent: () =>
          import('./views/dashboard/players/players-import/players-import.component').then(
            (m) => m.PlayersImportComponent
          ),
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
      import('./views/users/user-registration/user-registration.component').then(
        (m) => m.UserRegistrationComponent
      ),
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

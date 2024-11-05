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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

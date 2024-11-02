import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'player-registration',
    loadComponent: () =>
      import(
        './views/players/player-registration/player-registration.component'
      ).then((m) => m.PlayerRegistrationComponent),
  },
  {
    path: 'players',
    loadComponent: () =>
      import(
        './views/players/players-list/players-list.component'
      ).then((m) => m.PlayersListComponent),
  },
];

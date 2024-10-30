import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create_player',
    loadComponent: () =>
      import(
        './views/players/player-registration/player-registration.component'
      ).then((m) => m.PlayerRegistrationComponent),
  },
];

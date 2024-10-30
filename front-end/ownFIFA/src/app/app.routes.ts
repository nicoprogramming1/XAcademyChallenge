import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'player-registration',
    loadComponent: () =>
      import(
        './views/players/player-registration/player-registration.component'
      ).then((m) => m.PlayerRegistrationComponent),
  },
];

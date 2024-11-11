import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const role = localStorage.getItem('role');
  
  // aca verifica si la ruta requiere rol "Administrador"
  const requiredPath = route.routeConfig?.path;

  if (requiredPath === 'player-registration' || requiredPath === 'users') {
    if (role !== 'Administrador') {
      // si no es "Administrador" te redirige al dashboard
      router.navigate(['/dashboard']);
      return false;
    }
  }

  // si todo ok permite acceso
  return true;
};

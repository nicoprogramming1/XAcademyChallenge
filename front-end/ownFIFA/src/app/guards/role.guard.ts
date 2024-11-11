import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Trae el rol del usuario desde localStorage
  const role = localStorage.getItem('role');
  
  // Verifica si la ruta requiere rol "Administrador"
  const requiredPath = route.routeConfig?.path; // Accede al path de la ruta

  if (requiredPath === 'player-registration' || requiredPath === 'users') {
    if (role !== 'Administrador') {
      // Si no es "Administrador", redirige al dashboard
      router.navigate(['/dashboard']);
      return false;
    }
  }

  // Si el rol es el correcto o no hay rol, permite acceso
  return true;
};

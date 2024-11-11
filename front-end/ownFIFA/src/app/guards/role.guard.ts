import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  const requiredPath = route.routeConfig?.path;
  console.log(`roleGuard ejecutado para la ruta: ${requiredPath}. Rol del usuario: ${role}`);  // Verifica el rol y la ruta

  if (requiredPath === 'player-registration' || requiredPath === 'users') {
    if (role !== 'Administrador') {
      console.log('Rol no permitido. Redirigiendo a dashboard...');
      router.navigate(['/dashboard']);
      return false;  // Redirige si el rol no es el correcto
    }
  }

  console.log('Rol correcto, acceso permitido.');
  return true;  // Permite el acceso si el rol es válido
};

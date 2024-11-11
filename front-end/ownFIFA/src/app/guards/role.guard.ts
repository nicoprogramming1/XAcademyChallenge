import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // trae el rol del usuario desde localStorage
  const role = localStorage.getItem('role');
  
  const requiredRole = route.data['role']; // se define en la configuración de la ruta

  // verifica si el usuario tiene el rol necesario
  if (role !== requiredRole) {
    router.navigate(['/dashboard']);
    return false;
  }

  // si lo tiene permite
  return true;
};

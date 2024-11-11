import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log('authGuard ejecutado. Token encontrado:', token); // Verificar el token en el guard

  if (!token) {
    console.log('No se encontró token. Redirigiendo a login...');
    router.navigate(['/login']);  // Redirige si no hay token
    return false;
  }

  console.log('Token válido, acceso permitido.');
  return true;  // Permite el acceso si hay token
};


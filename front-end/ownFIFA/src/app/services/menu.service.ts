import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { Role } from '../interfaces/user.interface'; // Si tienes una enum Role para los roles

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  public getFilteredRoutes(): Routes {
    const userRole = localStorage.getItem('role'); // Obtiene el rol del usuario (si está en localStorage)
    const routes: Routes = [
      {
        path: 'player-registration',
        data: { title: 'Registrar Jugador' },
      },
      {
        path: 'players',
        data: { title: 'Listar Jugadores' },
      },
      {
        path: 'players-import',
        data: { title: 'Importar Jugadores', role: Role.ADMINISTRADOR },
      },
      {
        path: 'players-export',
        data: { title: 'Exportar Jugadores' },
      },
      {
        path: 'users',
        data: { title: 'Registrar Usuario', role: Role.ADMINISTRADOR },
      },
    ];

    // aca filtra las rutas según el rol del usuario
    return routes
      .map((route) => {
        if (route.children) {
          // filtra las rutas hijas dentro de cada ruta padre
          route.children = route.children.filter((child) => {
            return !child.data?.['role'] || child.data?.['role'] === userRole;
          });
        }
        return route;
      })
      .filter((route) => {
        return !route.data?.['role'] || route.data?.['role'] === userRole;
      });
  }
}

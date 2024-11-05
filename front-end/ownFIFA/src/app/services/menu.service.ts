import { computed, Injectable, signal } from '@angular/core';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private routeSignal = signal(routes);

  public routes = computed(() => {
     return this.routeSignal()
      .map((route) => route.children ?? [])
      .flat()
      .filter((route) => route.title)
      .map((route) => ({
        path: route.path,
        title: route.title,
      }));
  });
}

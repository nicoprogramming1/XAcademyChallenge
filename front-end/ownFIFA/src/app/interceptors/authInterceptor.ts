import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // registrado en el providers de app.comp
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log(
        'Token guardado en localStorage desde el interceptor:',
        localStorage.getItem('token')
    );
    console.log('Interceptor token:', token);
    
    // si hay token clona la solicitud con el encabezado auth
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Auth request with token:', authReq);
      return next.handle(authReq);
    }

    // Si no hay token continua al back y devuelve no autorizado
    console.log('Request without token:', req);
    return next.handle(req);
  }
}

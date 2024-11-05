import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { UserResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  saveUser(user: User): Observable<User | null> {
    return this.http.post<UserResponse>(`${this.apiUrl}/user`, user).pipe(
      map((res) => {
        if (res.success) {
          console.log('Se ha creado con éxito el usuario ', res.data);
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        const errorMessage = err.message || 'Error al guardar el usuario';
        console.error(errorMessage);
        return of(null);
      })
    )
  }
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { CsvUploadResponse } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  uploadCsv(file: File): Observable<CsvUploadResponse | null> {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    console.log("En el service csv front: ", formData)

    return this.http.post<CsvUploadResponse>(`${this.apiUrl}/csvdata`, formData).pipe(
      map((res) => {
        if (res.success) {
          console.log('Archivo CSV subido exitosamente:', res.message);
          return res;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError((err) => {
        const errorMessage = err.message || 'Error al subir el archivo CSV';
        console.error(errorMessage);
        return of(null);
      })
    );
  }
}

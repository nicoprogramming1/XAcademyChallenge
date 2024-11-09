import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  CsvUploadResponse,
} from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  uploadCsv(file: File): Observable<CsvUploadResponse | null> {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    console.log('En el service csv front: ', formData);

    return this.http
      .post<CsvUploadResponse>(`${this.apiUrl}/csvdata`, formData)
      .pipe(
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

  // llamada a la api para generar el archivo
  exportCsv(): Observable<Blob | null> {
    return this.http
      .get(`${this.apiUrl}/csvdata`, { responseType: 'blob' })
      .pipe(
        tap((res) => console.log('Archivo CSV exportado exitosamente', res)),
        catchError((err) => {
          console.error('Error al exportar el archivo CSV:', err);
          return of(null);
        })
      );
  }

  // crear la descarga del archivo
  downloadFile(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob); // Crea la URL del archivo
    const a = document.createElement('a');  // Crea un enlace para descargar el archivo
    a.href = url;
    a.download = fileName;  // Nombre del archivo
    a.click();  // Dispara el evento de clic
    window.URL.revokeObjectURL(url);  // Libera la URL creada
  }
}

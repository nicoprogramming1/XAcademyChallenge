import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-players-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-export.component.html',
  styleUrl: './players-export.component.scss'
})
export class PlayersExportComponent {
  private csvService = inject(CsvService)
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  exportDatabase(event: MouseEvent): void {
    event.preventDefault();  // evitar la recarga del formulario
    // el backend genera el archivo CSV
    this.csvService.exportCsv().subscribe({
      next: (blob: Blob | null) => { 
        if (blob) {
          // llamamos al servicio para descargar el archivo
          this.csvService.downloadFile(blob, 'jugadores.csv');
          this.successMessage = 'Archivo CSV exportado exitosamente.';
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Hubo un error al generar el archivo CSV.';
          this.successMessage = null;
          console.error('Error al descargar el archivo CSV.');
        }
      },
      error: (error) => {
        this.errorMessage = `Error al exportar el archivo CSV: ${error.message || error}`;
        this.successMessage = null;
        console.error('Error al exportar el archivo CSV:', error);
      }
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CsvService } from '../../../../services/csv.service';

@Component({
  selector: 'app-players-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-import.component.html',
  styleUrl: './players-import.component.scss',
})
export class PlayersImportComponent {
  private csvService = inject(CsvService);
  private fb = inject(FormBuilder);

  public file: File | null = null;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log("Desde onFileSelect del comp: ", input.value)
    if (input.files?.length) {
      const selectedFile = input.files[0];

      if (selectedFile.type === 'text/csv') {
        this.file = selectedFile;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Por favor, seleccione un archivo CSV válido.';
        this.file = null;  // resetear el archivo
      }
    } else {
      this.errorMessage = 'No se ha seleccionado ningún archivo.';
    }
  }

  onUpload(event: MouseEvent): void {
    event.preventDefault();  // evitar la recarga del formulario
  
    if (!this.file) {
      this.errorMessage = 'Debe seleccionar un archivo CSV antes de continuar.';
      return;
    }
  
    console.log("Desde el import comp: ", this.file);
  
    this.csvService.uploadCsv(this.file).subscribe({
      next: (response) => {
        this.successMessage = 'Archivo cargado exitosamente.';
        this.errorMessage = null;
        console.log('Archivo cargado exitosamente:', response);
      },
      error: (error) => {
        this.errorMessage = `Error al cargar el archivo: ${error.message || error}`;
        this.successMessage = null;
        console.error('Error al cargar el archivo:', error);
      },
    });
  }
  
}

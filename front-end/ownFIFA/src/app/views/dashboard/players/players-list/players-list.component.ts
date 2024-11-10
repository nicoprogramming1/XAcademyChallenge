import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { PlayerStateService } from '../../../../services/player-state.service';
import { CardPlayerComponent } from '../../../../shared/card-player/card-player.component';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LoadingErrorComponent } from '../../../../shared/loading-error/loading-error.component';
import { TitleH1Component } from "../../../../shared/title-h1/title-h1.component";

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [
    CommonModule,
    CardPlayerComponent,
    LoadingSpinnerComponent,
    FormsModule,
    LoadingErrorComponent,
    TitleH1Component
],
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent {
  private playerService = inject(PlayerService);
  private playerStateService = inject(PlayerStateService);

  public loading = this.playerStateService.loading;
  public error = this.playerStateService.error;
  public successMessage = this.playerStateService.successMessage;
  public players = this.playerStateService.players;

  public page: number = 1;
  public title: string = "Listado de jugadores"

  public filter = {
    club: '',
    nationality: '',
    age: undefined,
    longName: ''
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.loadPlayers(this.page);
    }, 3000);
  }

  loadPlayers(page: number) {
    console.log("loadPlayers page: ", page);
    this.playerService.getAllPlayers(page, this.filter).subscribe({
      next: (res) => {
        this.page = page;
        console.log(`Se devuelven con éxito ${res?.data.players.length} jugadores para la página ${page}`);
        console.log("Desde loadPlayers, lista de jugadores: ", res?.data.players);
      },
      error: (err) => {
        console.error('Error al cargar jugadores: ', err.message);
      },
    });
  }

  applyFilters(event: Event) {
    event.preventDefault();
    this.loadPlayers(1);
  }

  exportToCSV() {
    this.playerService.getFilteredPlayersForExport(this.filter).subscribe({
      next: (res) => {
        console.log('Datos recibidos para exportar:', res); // Diagnóstico

        if (res && res.data.players?.length) {
          const worksheet = XLSX.utils.json_to_sheet(res.data.players);
          const workbook = { Sheets: { 'Jugadores': worksheet }, SheetNames: ['Jugadores'] };
          XLSX.writeFile(workbook, 'jugadores_filtrados.csv');
        } else {
          console.error('No hay jugadores para exportar');
        }
      },
      error: (err) => console.error('Error al descargar CSV:', err),
    });
  }
  
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { PlayerStateService } from '../../../services/player-state.service';
import { CardPlayerComponent } from '../../../shared/card-player/card-player.component';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [
    CommonModule,
    CardPlayerComponent,
    LoadingSpinnerComponent,
    FormsModule
  ],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
})
export class PlayersListComponent {
  private playerService = inject(PlayerService);
  private playerStateService = inject(PlayerStateService);

  public loading = this.playerStateService.loading;
  public error = this.playerStateService.error;
  public successMessage = this.playerStateService.successMessage;
  public players = this.playerStateService.players;

  public page: number = 1;

  public filter = {
    club: '',
    nationality: '',
    age: undefined,
    longName: ''
  };

  ngOnInit(): void {
    setTimeout(() => {  // simular retardo de api
      this.loadPlayers(this.page);
    }, 3000);
  }

  loadPlayers(page: number) {
    // actualiza el state lista de jugadores para la page actual
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
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    this.loadPlayers(1); // Reiniciar a la primera página al aplicar filtros
  }
}

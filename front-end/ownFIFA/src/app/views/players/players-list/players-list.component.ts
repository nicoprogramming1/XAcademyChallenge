import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlayerService } from '../../../services/player.service';
import { PlayerStateService } from '../../../services/player-state.service';
import { Player } from '../../../interfaces/player.interface';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
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

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.fetchPlayers().subscribe({
      // actualiza el state de jugadores
      next: (res) => {
        console.log(`Se devuelven con éxito ${res?.length} jugadores`);
      },
      error: (err) => {
        console.log('Error al cargar jugadores: ', err.message);
      },
    });
  }
}

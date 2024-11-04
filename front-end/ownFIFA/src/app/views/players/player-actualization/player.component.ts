import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { PlayerStateService } from '../../../services/player-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  private playerService = inject(PlayerService);
  private playerStateService = inject(PlayerStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  public loading = this.playerStateService.loading;
  public error = this.playerStateService.error;
  public successMessage = this.playerStateService.successMessage;
  public player = this.playerStateService.player; // tiene el player actualizado desde el state

  private id!: number | null;
  public editMode: boolean = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== null) {
      this.loadPlayer(this.id);
    } else {
      console.error('El id del jugador es nulo');
    }
  }

  loadPlayer(id: number) {
    this.playerService.getPlayerById(id).subscribe({
      next: (res) => {
        // el jugador es cargado en el state durante el getPlayerById del service
        console.log('loadPlayer: se recuperó el jugador: ', res?.longName);
      },
      error: (err) => {
        console.error('Error recuperando el jugador con el id: ', id);
      },
    });
  }

  confirmDelete(): void {
    const confirmed = confirm(
      '¿Está seguro de que desea eliminar el/la jugador/a?'
    );
    if (confirmed) {
      if(this.id !== null) {
        this.deletePlayer(this.id);
      }
      else {
        console.error("El id del jugador a eliminar es nulo")
      }
    }
  }

  deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe({
      next: res => {
        console.log("Jugador eliminado con éxito")
        this.router.navigate(["/players"])
      },
      error: err => {
        alert("Se ha producido un error en la eliminación del jugador!")
        console.error("Ha ocurrido un error al eliminar el jugador")
      }
    })
  }

  toggleEdit(): void {
    !this.editMode;
  }
}

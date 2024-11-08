import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { PlayerStateService } from '../../../../services/player-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../../../../interfaces/player.interface';
import { Chart, ChartType, registerables } from 'chart.js';
import { LoadingErrorComponent } from "../../../../shared/loading-error/loading-error.component";
import { TitleH1Component } from "../../../../shared/title-h1/title-h1.component";
Chart.register(...registerables);

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
    LoadingErrorComponent,
    TitleH1Component
],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  private playerService = inject(PlayerService);
  private playerStateService = inject(PlayerStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public loading = this.playerStateService.loading;
  public error = this.playerStateService.error;
  public successMessage = this.playerStateService.successMessage;
  public player = this.playerStateService.player; // tiene el player actualizado desde el state

  private id!: number | null;
  public editMode!: boolean;
  public editablePlayer: Partial<Player> | null = null; // copia parcial editable de player
  public skillsChart!: Chart;
  public title: string = "Registrar jugador"
  
  ngOnInit(): void {
    this.editMode = false;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== null) {
      this.loadPlayer(this.id);
    } else {
      // necesito una pantalla de error aqui
      console.error('El id del jugador es nulo');
    }
  }

  loadPlayer(id: number) {
    this.playerService.getPlayerById(id).subscribe({
      next: (res) => {
        // el jugador es cargado en el state durante el getPlayerById del service
        console.log('loadPlayer: se recuperó el jugador: ', res?.longName);
        setTimeout(() => {
          this.renderSkillsChart(); // renderiza el chart
        }, 0); // 0 ms para asegurarte que se ejecute después de que el DOM esté actualizado
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
      if (this.id !== null) {
        this.deletePlayer(this.id);
      } else {
        console.error('El id del jugador a eliminar es nulo');
      }
    }
  }

  deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe({
      next: (res) => {
        console.log('Jugador eliminado con éxito', res);
        this.redirect();
      },
      error: (err) => {
        alert('Se ha producido un error en la eliminación del jugador!');
        console.error('Ha ocurrido un error al eliminar el jugador', err);
      },
    });
  }

  redirect(): void {
    this.router.navigate(['/players']);
  }

  // cambia entre las vistas de sólo lectua y edición
  toggleEdit(): void {
    this.editMode = !this.editMode;
    if(this.editMode && this.player()) {
      this.editablePlayer = { ...this.player() }; // copia los datos de la signal
      console.log("Desde el toggleEdit, editablePlayer es: ", this.editablePlayer)
    }
  }

  onSaveChanges(): void {
    this.editablePlayer = { ...this.player() };
    if (this.editablePlayer) {
      this.playerService.updatePlayer(this.id!, this.editablePlayer).subscribe({
        next: (res) => {
          console.log('Jugador guardado con éxito', res);
          this.toggleEdit() // vuelve a modo readOnly
        },
        error: (err) => {
          alert('Se ha producido un error en el guardado del jugador!');
          console.error('Ha ocurrido un error al guardar el jugador', err);
        },
      });
      console.log('Guardando cambios de jugador: ', this.editablePlayer);
    }
  }
  

  cancelEdit(): void {
    this.editablePlayer = null;
    this.toggleEdit()
  }

  renderSkillsChart() {
    if (this.skillsChart) {
      this.skillsChart.destroy(); // se asegura que no haya otro grafico
    }
  
    const player = this.player();
    console.log("Desde el renderChart, player cargado: ", player)
    
    // filtra los datos para asegurar de que no haya valores undefined
    const shooting = player?.shooting ?? 0;
    const dribbling = player?.dribbling ?? 0;
    const passing = player?.passing ?? 0;
    const overall = player?.overall ?? 0;
    const potential = player?.potential ?? 0;

    const data = {
      labels: ['Disparo', 'Regateo', 'Pase', "General", "Potencial"],
      datasets: [
        {
          label: player?.longName,
          data: [shooting, dribbling, passing, overall, potential],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    this.skillsChart = new Chart('skillsRadarChart', {
      type: 'radar' as ChartType,
      data: data,
      options: {
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
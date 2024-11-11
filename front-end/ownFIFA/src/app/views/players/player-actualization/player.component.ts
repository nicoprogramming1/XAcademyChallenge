import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { PlayerStateService } from '../../../services/player-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyType, FifaUpdate, FifaVersion, Player, playerFaceUrl, PlayerPositions, PreferredFoot } from '../../../interfaces/player.interface';
import { Chart, ChartType, registerables } from 'chart.js';
import { LoadingErrorComponent } from "../../../shared/loading-error/loading-error.component";
import { TitleH1Component } from "../../../shared/title-h1/title-h1.component";
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
  private fb = inject(FormBuilder);
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
  public title!: string

  public invalidForm: boolean = false;
  public updateForm!: FormGroup;

  public playerPositions = Object.values(PlayerPositions);
  public preferredFoot = Object.values(PreferredFoot);
  public bodyType = Object.values(BodyType);
  public fifaUpdate = Object.values(FifaUpdate);
  public fifaVersion = Object.values(FifaVersion);
  public playerFaceUrl = Object.values(playerFaceUrl);
  
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

          this.updateForm = this.fb.group({
            longName: new FormControl(this.player()?.longName, [
              Validators.required,
              Validators.minLength(3),
            ]),
            age: new FormControl(this.player()?.age, [Validators.required, Validators.min(1)]),
            playerPositions: this.fb.array([], Validators.required),
            clubName: new FormControl(this.player()?.clubName),
            nationalityName: new FormControl(this.player()?.nationalityName),
            preferredFoot: new FormControl(this.player()?.preferredFoot),
            bodyType: new FormControl(this.player()?.bodyType),
            heightCm: new FormControl(this.player()?.heightCm, Validators.min(1)),
            weightKg: new FormControl(this.player()?.weightKg, Validators.min(1)),
            potential: new FormControl(this.player()?.potential, [Validators.required, Validators.min(1)]),
            overall: new FormControl(this.player()?.overall, [Validators.required, Validators.min(1)]),
            fifaVersion: new FormControl(this.player()?.fifaVersion, [Validators.required, Validators.min(1)]),
            fifaUpdate: new FormControl(this.player()?.fifaUpdate, [Validators.required, Validators.min(1)]),
            passing: new FormControl(this.player()?.passing, Validators.min(1)),
            dribbling: new FormControl(this.player()?.dribbling, Validators.min(1)),
            shooting: new FormControl(this.player()?.shooting, Validators.min(1)),
          });
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
    if (this.updateForm.valid) {
      const formValues = this.updateForm.value;

      const updatedPlayer: Player = {
        longName: formValues.longName,
        age: formValues.age,
        playerPositions: formValues.playerPositions.join(','), // convierte strings a array
        clubName: formValues.clubName || null,
        nationalityName: formValues.nationalityName || null,
        preferredFoot: formValues.preferredFoot || null,
        bodyType: formValues.bodyType || null,
        heightCm: formValues.heightCm || null,
        weightKg: formValues.weightKg || null,
        potential: formValues.potential || null,
        overall: formValues.overall,
        fifaVersion: formValues.fifaVersion,
        fifaUpdate: formValues.fifaUpdate,
        passing: formValues.passing || null,
        dribbling: formValues.dribbling || null,
        shooting: formValues.shooting || null,
      };

     // Actualiza el jugador con los nuevos valores
     this.playerService.updatePlayer(this.id!, updatedPlayer).subscribe({
      next: (res) => {
        console.log('Jugador guardado con éxito', res);
        this.toggleEdit(); // Vuelve a modo solo lectura
      },
      error: (err) => {
        alert('Se ha producido un error en el guardado del jugador!');
        console.error('Ha ocurrido un error al guardar el jugador', err);
      },
    });
    console.log('Guardando cambios de jugador: ', updatedPlayer);
  }
}

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement; // tipo de evento
    const selectedPlayerPositions = this.updateForm.get(
      'playerPositions'
    ) as FormArray;

    if (input.checked) {
      selectedPlayerPositions.push(this.fb.control(input.value));
    } else {
      const index = selectedPlayerPositions.controls.findIndex(
        (x) => x.value === input.value
      );
      selectedPlayerPositions.removeAt(index);
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

  resetForm(): void {
    this.updateForm.reset();
    (this.updateForm.get('playerPositions') as FormArray).clear(); // Limpia el array
    this.invalidForm = false;
  }

  showAgeErrors() {
    const age = this.updateForm.get('age');

    if (age?.touched && !age.valid) {
      switch (true) {
        case age.errors!['required']:
          return 'La edad es obligatoria';
        case age.errors!['min']:
          return 'La edad debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showNameErrors() {
    const longName = this.updateForm.get('longName');

    if (longName?.touched && !longName.valid) {
      switch (true) {
        case longName.errors!['required']:
          return 'El nombre es obligatoria';
        case longName.errors!['minLength']:
          return 'El nombre debe tener al menos 3 caracteres';
        default:
          return null;
      }
    }
    return null;
  }

  showPlayerPositionsErrors() {
    const playerPositions = this.updateForm.get('playerPositions');

    if (playerPositions?.untouched && !playerPositions.valid) {
      switch (true) {
        case playerPositions.errors!['required']:
          return 'Debe seleccionar una posición';
        default:
          return null;
      }
    }
    return null;
  }

  showPlayerFaceUrlErrors() {
    const playerFaceUrl = this.updateForm.get('playerFaceUrl');

    if (playerFaceUrl?.touched && !playerFaceUrl.valid) {
      switch (true) {
        case playerFaceUrl.errors!['required']:
          return 'Debe seleccionar un rostro para el jugador';
        default:
          return null;
      }
    }
    return null;
  }

  showHeightCmErrors() {
    const heightCm = this.updateForm.get('heightCm');

    if (heightCm?.touched && !heightCm.valid) {
      switch (true) {
        case heightCm.errors!['min']:
          return 'La altura debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showWeightKgErrors() {
    const weightKg = this.updateForm.get('weightKg');

    if (weightKg?.touched && !weightKg.valid) {
      switch (true) {
        case weightKg.errors!['min']:
          return 'El peso debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showPotentialErrors() {
    const potential = this.updateForm.get('potential');

    if (potential?.touched && !potential.valid) {
      switch (true) {
        case potential.errors!['required']:
          return 'El potencial es obligatorio';
        case potential.errors!['min']:
          return 'El potencial debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showOverallErrors() {
    const overall = this.updateForm.get('overall');

    if (overall?.touched && !overall.valid) {
      switch (true) {
        case overall.errors!['required']:
          return 'El nivel general es obligatorio';
        case overall.errors!['min']:
          return 'El nivel general debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showFifaVersionErrors() {
    const fifaVersion = this.updateForm.get('fifaVersion');

    if (fifaVersion?.touched && !fifaVersion.valid) {
      switch (true) {
        case fifaVersion.errors!['required']:
          return 'Debes seleccionar una versión';
        case fifaVersion.errors!['min']:
          return 'La versión debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showFifaUpdateErrors() {
    const fifaUpdate = this.updateForm.get('fifaUpdate');

    if (fifaUpdate?.touched && !fifaUpdate.valid) {
      switch (true) {
        case fifaUpdate.errors!['required']:
          return 'Debes seleccionar un update';
        case fifaUpdate.errors!['min']:
          return 'El update debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showPassingErrors() {
    const passing = this.updateForm.get('passing');

    if (passing?.touched && !passing.valid) {
      switch (true) {
        case passing.errors!['min']:
          return 'El pase debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showDribblingErrors() {
    const dribbling = this.updateForm.get('dribbling');

    if (dribbling?.touched && !dribbling.valid) {
      switch (true) {
        case dribbling.errors!['min']:
          return 'El regateo debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }

  showShootingErrors() {
    const shooting = this.updateForm.get('shooting');

    if (shooting?.touched && !shooting.valid) {
      switch (true) {
        case shooting.errors!['min']:
          return 'El disparo debe ser un número positivo';
        default:
          return null;
      }
    }
    return null;
  }
}
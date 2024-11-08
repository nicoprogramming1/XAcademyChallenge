import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BodyType,
  FifaUpdate,
  FifaVersion,
  Player,
  playerFaceUrl,
  PlayerPositions,
  PreferredFoot,
} from '../../../../interfaces/player.interface';
import { PlayerService } from '../../../../services/player.service';
import { PlayerStateService } from '../../../../services/player-state.service';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrl: './player-registration.component.scss',
})
export class PlayerRegistrationComponent {
  private fb = inject(FormBuilder);
  private playerService = inject(PlayerService);
  private playerStateService = inject(PlayerStateService);

  public loading = this.playerStateService.loading;
  public error = this.playerStateService.error;
  public successMessage = this.playerStateService.successMessage;

  public invalidForm: boolean = false;

  public registerForm!: FormGroup;
  public playerPositions = Object.values(PlayerPositions);
  public preferredFoot = Object.values(PreferredFoot);
  public bodyType = Object.values(BodyType);
  public fifaUpdate = Object.values(FifaUpdate);
  public fifaVersion = Object.values(FifaVersion);
  public playerFaceUrl = Object.values(playerFaceUrl);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      longName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      playerPositions: this.fb.array([], Validators.required),
      playerFaceUrl: new FormControl('', Validators.required),
      clubName: new FormControl(''),
      nationalityName: new FormControl(''),
      preferredFoot: new FormControl(''),
      bodyType: new FormControl(''),
      heightCm: new FormControl('', Validators.min(1)),
      weightKg: new FormControl('', Validators.min(1)),
      potential: new FormControl('', [Validators.required, Validators.min(1)]),
      overall: new FormControl('', [Validators.required, Validators.min(1)]),
      fifaVersion: new FormControl('', [Validators.required, Validators.min(1)]),
      fifaUpdate: new FormControl('', [Validators.required, Validators.min(1)]),
      passing: new FormControl('', Validators.min(1)),
      dribbling: new FormControl('', Validators.min(1)),
      shooting: new FormControl('', Validators.min(1)),
    });
  }

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement; // tipo de evento
    const selectedPlayerPositions = this.registerForm.get(
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

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      const player: Player = {
        longName: formValues.longName,
        age: formValues.age,
        playerPositions: formValues.playerPositions.join(','), // convierte strings a array
        playerFaceUrl: formValues.playerFaceUrl || null,
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

      this.playerService.savePlayer(player).subscribe({
        next: (res) => {
          console.log('Se ha registrado con éxito al jugador: ', res?.longName);
          this.invalidForm = false;
        },
        error: (err) => {
          console.error('Ha habido un error en el registro', err);
          this.invalidForm = true;
        },
        complete: () => {
          this.resetForm();
        },
      });
    } else {
      this.invalidForm = true;
      console.log('El formulario no está validado');
    }
  }

  resetForm(): void {
    this.registerForm.reset();
    (this.registerForm.get('playerPositions') as FormArray).clear(); // Limpia el array
    this.invalidForm = false;
  }

  showAgeErrors() {
    const age = this.registerForm.get('age');

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
    const longName = this.registerForm.get('longName');

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
    const playerPositions = this.registerForm.get('playerPositions');

    if (playerPositions?.touched && !playerPositions.valid) {
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
    const playerFaceUrl = this.registerForm.get('playerFaceUrl');

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
    const heightCm = this.registerForm.get('heightCm');

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
    const weightKg = this.registerForm.get('weightKg');

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
    const potential = this.registerForm.get('potential');

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
    const overall = this.registerForm.get('overall');

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
    const fifaVersion = this.registerForm.get('fifaVersion');

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
    const fifaUpdate = this.registerForm.get('fifaUpdate');

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
    const passing = this.registerForm.get('passing');

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
    const dribbling = this.registerForm.get('dribbling');

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
    const shooting = this.registerForm.get('shooting');

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

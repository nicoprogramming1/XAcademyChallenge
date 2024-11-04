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
} from '../../../interfaces/player.interface';
import { PlayerService } from '../../../services/player.service';
import { PlayerStateService } from '../../../services/player-state.service';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
      longName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      playerPositions: this.fb.array([], Validators.required),
      playerFaceUrl: new FormControl('', Validators.required),
      clubName: new FormControl(''),
      nationalityName: new FormControl(''),
      preferredFoot: new FormControl(''),
      bodyType: new FormControl(''),
      heightCm: new FormControl(''),
      weightKg: new FormControl(''),
      potential: new FormControl('', Validators.required),
      overall: new FormControl('', Validators.required),
      fifaVersion: new FormControl('', Validators.required),
      fifaUpdate: new FormControl('', Validators.required),
      passing: new FormControl(''),
      dribbling: new FormControl(''),
      shooting: new FormControl(''),
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
        playerPositions: formValues.playerPositions.join(','),  // convierte strings a array
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
}

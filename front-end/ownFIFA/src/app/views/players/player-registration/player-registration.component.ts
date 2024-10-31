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
import { BodyType, FifaUpdate, FifaVersion, Player, playerFaceUrl, PlayerPositions, PreferredFoot } from '../../../interfaces/player.interface';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrl: './player-registration.component.scss',
})
export class PlayerRegistrationComponent {
  private fb = inject(FormBuilder);
  private playerService = inject(PlayerService)
  public registerForm!: FormGroup;
  public playerPositions = Object.values(PlayerPositions);
  public preferredFoot = Object.values(PreferredFoot);
  public bodyType = Object.values(BodyType);
  public fifaUpdate = Object.values(FifaUpdate)
  public fifaVersion = Object.values(FifaVersion)
  public playerFaceUrl = Object.values(playerFaceUrl)

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      longName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required]),
      playerPositions: this.fb.array([]),
      playerFaceUrl: new FormControl('', Validators.required),
      clubName: new FormControl('', Validators.required),
      nationalityName: new FormControl('', Validators.required),
      preferredFoot: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required),
      heightCm: new FormControl('', Validators.required),
      weightKg: new FormControl('', Validators.required),
      potential: new FormControl('', Validators.required),
      overall: new FormControl('', Validators.required),
      fifaVersion: new FormControl('', Validators.required),
      fifaUpdate: new FormControl('', Validators.required),
    });
  }

  onCheckboxChange(event: any) {
    const selectedPlayerPositions = this.registerForm.get(
      'playerPositions'
    ) as FormArray;
    if (event.target.checked) {
      selectedPlayerPositions.push(this.fb.control(event.target.value));
    } else {
      const index = selectedPlayerPositions.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedPlayerPositions.removeAt(index);
    }
  }

  onSubmit() {
    if(this.registerForm.valid) {   // creamos un jugador según interfaz Player
      const player: Player = {
        longName: this.registerForm.get("longName")?.value,
        age: this.registerForm.get("age")?.value,
        playerPositions: this.registerForm.get("playerPositions")?.value,
        playerFaceUrl: this.registerForm.get("playerFaceUrl")?.value,
        clubName: this.registerForm.get("clubName")?.value,
        nationalityName: this.registerForm.get("nationalityName")?.value,
        preferredFoot: this.registerForm.get("preferredFoot")?.value,
        bodyType: this.registerForm.get("bodyType")?.value,
        heightCm: this.registerForm.get("heightCm")?.value,
        weightKg: this.registerForm.get("weightKg")?.value,
        potential: this.registerForm.get("potential")?.value,
        overall: this.registerForm.get("overall")?.value,
        fifaVersion: this.registerForm.get("fifaVersion")?.value,
        fifaUpdate: this.registerForm.get("fifaUpdate")?.value,
      }

      this.playerService.savePlayer(player).suscribe()

    }

  }
}

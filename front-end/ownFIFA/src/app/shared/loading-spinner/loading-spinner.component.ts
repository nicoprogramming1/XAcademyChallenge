import { Component, inject } from '@angular/core';
import { PlayerStateService } from '../../services/player-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private playerStateService = inject(PlayerStateService)

  public loading = this.playerStateService.loading; 
}

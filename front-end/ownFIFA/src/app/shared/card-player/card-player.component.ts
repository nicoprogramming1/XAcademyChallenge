import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.scss'
})
export class CardPlayerComponent {
  @Input() photoUrl!: string
  @Input() longName!: string
  @Input() age!: number
  @Input() nationality!: string
  @Input() overall!: number
  @Input() club!: string
  @Input() id!: string
}

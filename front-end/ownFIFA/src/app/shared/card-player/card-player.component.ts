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
  @Input() playerFaceUrl!: string
  @Input() longName!: string
  @Input() age!: number
  @Input() nationalityName: string | undefined = "Desconocida"
  @Input() overall!: number
  @Input() clubName: string | undefined  = "Desconocido"
  @Input() id!: number | undefined 
}

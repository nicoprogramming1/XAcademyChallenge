import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() clubName: string | undefined
  @Input() id?: number

  private router = inject(Router)

  ngOnInit(): void {
    if(!this.clubName) {
      this.clubName = "Libre"
    }
  }

  navigateToPlayer(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['dashboard/players', id]);
    }
  }

}

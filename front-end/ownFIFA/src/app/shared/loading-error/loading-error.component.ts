import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-error.component.html',
  styleUrl: './loading-error.component.scss'
})
export class LoadingErrorComponent {
  @Input() error!: string | null
}

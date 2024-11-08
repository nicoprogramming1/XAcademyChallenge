import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-h1',
  standalone: true,
  imports: [],
  templateUrl: './title-h1.component.html',
  styleUrl: './title-h1.component.scss'
})
export class TitleH1Component {
  @Input() title!: string
}

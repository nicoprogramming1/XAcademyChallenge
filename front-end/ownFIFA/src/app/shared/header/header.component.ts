import { Component, Input } from '@angular/core';
import { LogoutComponent } from '../../views/login/logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() loginPage!: boolean
}

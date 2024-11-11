import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LogoutComponent } from './views/users/login/logout/logout.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LogoutComponent, SidemenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ownFIFA';
}

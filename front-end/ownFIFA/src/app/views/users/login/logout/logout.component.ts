import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  private router = inject(Router);
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

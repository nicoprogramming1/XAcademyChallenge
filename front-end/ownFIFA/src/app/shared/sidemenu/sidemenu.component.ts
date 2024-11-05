import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  private menuService = inject(MenuService)

  public menuItems = this.menuService.routes
}

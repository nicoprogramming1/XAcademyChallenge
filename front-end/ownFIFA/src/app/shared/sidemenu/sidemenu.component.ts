import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  public menuItems: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getFilteredRoutes();
    console.log('Menu Items:', this.menuItems);
  }
}

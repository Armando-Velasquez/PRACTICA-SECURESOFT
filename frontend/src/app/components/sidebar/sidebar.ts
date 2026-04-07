import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Home, Users, LayoutPanelLeft } from 'lucide-angular';
import { routesArrayCommon } from '../../views/routes/common.routes';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  // ICONS
  Home = Home;
  Users = Users;
  LayoutPanelLeft = LayoutPanelLeft;


  routerArray: string[] = []

  constructor(
    private readonly router: Router
  ) {
    this.routerArray = [ ...routesArrayCommon ]
  }


  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigateTo2(path: string) {
    window.location.href = path;
  }
}

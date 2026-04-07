import { Component } from '@angular/core';
import { JModeToggleComponent } from '../../tailjng/mode-toggle/mode-toggle.component';
import { LucideAngularModule, User, LogOut, Loader2 } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routesArrayCommon } from '../../views/routes/common.routes';

@Component({
  selector: 'app-navbar',
  imports: [JModeToggleComponent, LucideAngularModule, NgClass, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // ICONS
  User = User;
  LogOut = LogOut;
  Loader2 = Loader2;

  routerArray: string[] = []

  loadingLogout: boolean = false;

  constructor() {
    this.routerArray = [ ...routesArrayCommon ]
  }

  logout() {

    

  }



}

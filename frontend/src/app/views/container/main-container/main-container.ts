import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Navbar } from '../../../components/navbar/navbar';
import { Sidebar } from '../../../components/sidebar/sidebar';

import { routesArrayModule } from '../../routes/module.routes';
import { routesArrayCommon } from '../../routes/common.routes';
import { JAlertToastComponent } from '../../../tailjng/alert/alert-toast/toast-alert.component';
import { environment } from '../../../../enviroment';
import { TextFunction } from '../../../shared/function/text.function';

@Component({
  selector: 'app-main-container',
  imports: [Navbar, Sidebar, RouterOutlet, JAlertToastComponent],
  templateUrl: './main-container.html',
  styleUrl: './main-container.css',
})
export class MainContainerComponent implements OnInit {

  titleBase: string = 'Securesoft';
  title_component: string = 'Main Container';

  routerArray: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly titleService: Title
  ) { 

    this.router.events.subscribe((event) => {
      this.updateTitle();
    })

  }

  ngOnInit(): void {

    // Rutas
    this.routerArray = [...routesArrayModule, ...routesArrayCommon]

    // Actualizar nombre
    this.updateTitle();

  }

  updateTitle() {
    const path: string = window.location.pathname;
    let newPath;

    // Verificacion de si la ruta incluye / + nombre del modulo
    const index = path.indexOf(`/${environment.nameApp}`)

    if (index !== -1) {
      // obtener la parte de la ruta
      newPath = path.substring(index + `/${environment.nameApp}`.length)
    } else {
      newPath = path;
    }

    // Titulo del componente
    if (this.routerArray.includes(newPath)) {
      const parts = newPath.split('/');
      const lastPart = parts[parts.length - 1];
      const newTitle = TextFunction.normalizeDashText(
        TextFunction.capitalizeFirstLetter(lastPart) || 'Default title'
      )

      if (this.title_component !== newTitle) {

        const real_title = newTitle;
        const real_titleWeb = `${this.titleBase} - ${real_title}`;

        this.title_component = real_title;

        this.titleService.setTitle(real_titleWeb);
        document.documentElement.style.setProperty('--title-length', this.title_component.length.toString());
      }

    }

  }

}

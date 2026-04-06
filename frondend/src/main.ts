import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

import 'zone.js';

// Configuracion regional
import localEs from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localEs)


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

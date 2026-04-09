import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// ICONS
import { provideIcons } from '@ng-icons/core';
import { lucideCross } from '@ng-icons/lucide';

// RUTAS
import { routes } from './views/routes/public.routes';
import { routesMainContainer } from './views/routes/main-container.routes';

// INTRCEPTORES
import { authTokenInterceptor } from './core/interceptor/auth-token.interceptor';
import { errorInterceptor } from './core/interceptor/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: LOCALE_ID, useValue: 'es-CO' },

    provideBrowserGlobalErrorListeners(),

    provideRouter(routesMainContainer),
    provideRouter(routes),

    provideAnimations(),

    provideHttpClient(withInterceptors([authTokenInterceptor, errorInterceptor])),

    CurrencyPipe,
    provideIcons({ lucideCross }),
  ]
};

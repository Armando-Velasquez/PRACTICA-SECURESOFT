import { Routes } from "@angular/router";

// Guards

// Estructura / Contenedor
import { MainContainerComponent } from "../container/main-container/main-container";

// Rutas
import { home, routesCommon } from "./common.routes";
import { routesModule } from "./module.routes";



export const routesMainContainer: Routes = [
    {
        path: '', component: MainContainerComponent,
        canActivate: [],
        children: [
            { path: '', redirectTo: home, pathMatch: 'full' },
            ...routesCommon,
            ...routesModule,
        ]
    }

]
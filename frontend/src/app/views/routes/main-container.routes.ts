import { Routes } from "@angular/router";

// Guards
import { initGuard } from "../../core/guard/init.guard";
import { loggedInGuard } from "../../core/guard/logged-in.guard";

// Estructura / Contenedor
import { MainContainerComponent } from "../container/main-container/main-container";

// Rutas
import { home, routesCommon } from "./common.routes";
import { routesModule } from "./module.routes";



export const routesMainContainer: Routes = [
    {
        path: '', component: MainContainerComponent,
        canActivate: [loggedInGuard, initGuard],
        children: [
            { path: '', redirectTo: home, pathMatch: 'full' },
            ...routesCommon,
            ...routesModule,
        ]
    }

]
import { Routes } from "@angular/router";


// Guards

// Functions
import { TextFunction } from '../../shared/function/text.function';

// Camponents
import { HomeComponent } from "../common/home/home";
import { ProfileComponent } from "../common/profile/profile";


// Nombre de rutas
export const home: string = 'inicio';      // 0
const profile: string = 'perfil';   // 1


// Defino el array de rutas
export const routesArrayCommon: string[] = [
    '/' + home,
    '/' + profile
]


export const routesCommon: Routes = [
    {
        path: home, component: HomeComponent,
        // canActivate: [],
        data: {
            title: TextFunction.capitalizeFirstLetter(home),
            // allowedRoles: [1, 2]
        },
    },
    {
        path: profile, component: ProfileComponent,
        // canActivate: [],
        data: {
            title: TextFunction.capitalizeFirstLetter(profile),
            // allowedRoles: [1, 2]
        },
    }

]
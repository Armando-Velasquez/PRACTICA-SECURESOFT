import { Routes } from '@angular/router';

// Guards

// Functions
import { TextFunction } from '../../shared/function/text.function';

// Camponents
import { AuthComponent } from '../public/auth/auth';
import { Err404Component } from '../public/error/err404/err404';
import { Err500Component } from '../public/error/err500/err500';


// Nombre de rutas
const err404: string = '404';       // 0
const login: string = 'login';      // 1
const err500: string = '500';       // 2

// Defino el array de rutas
export const routesArray: string[] = [
    '/' + err404,
    '/' + login,
    '/' + err500
];


export const routes: Routes = [
    { path: login, redirectTo: login, pathMatch: 'full' },
    {
        path: login, component: AuthComponent,
        data: { title: TextFunction.capitalizeFirstLetter(login) },
        canActivate: []
    },
    {
        path: err404, component: Err404Component,
        data: { title: TextFunction.capitalizeFirstLetter(err404) },
    },
    {
        path: err500, component: Err500Component,
        data: { title: TextFunction.capitalizeFirstLetter(err500) },
    },

    { path: '**', redirectTo: routesArray[0] } // 404
];

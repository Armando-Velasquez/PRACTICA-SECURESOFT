import { Injectable } from "@angular/core";
import { environment } from "../../../enviroment";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../infrastructure/service/auth.service";
import { catchError, map, Observable, of } from "rxjs";
import { routesArray } from "../../views/routes/public.routes";


@Injectable({
    providedIn: 'root'
})
export class SystemService {

    // Endpoint
    url: string = `${environment.urlBase}`

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient,
        private readonly authService: AuthService,
    ) { }


    // Verificar el estado del servidor
    checkServerStatus(): Observable<boolean> {
        return this.http.get(`${this.url}`, { responseType: 'text' }).pipe(
            map(() => {
                console.log('Servidor activo');
                return true;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('Servidor inactivo', error);

                const user = this.authService.getSessionData()
                const currentUrl = this.router.url;
                console.log('URL actual:', currentUrl);

                if (error.status === 0 || error.status === 404) {

                    if ((!user || user.id_role !== 1)) {
                        this.authService.logoutUser(false);
                    }
                    return of(false);

                }
                return of(false);


            })
        )
    
    }
}
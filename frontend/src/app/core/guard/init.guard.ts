import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../infrastructure/service/auth.service";
import { tap } from "rxjs";
import { routesArray } from "../../views/routes/public.routes";

export const initGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Carga de informacion de la sesion
    return authService.getUserDetails().pipe(
        tap((isAuthenticated: any) => {
            if (!isAuthenticated) {
                router.navigate([routesArray[1]]); // login
            }
        })
    )
}
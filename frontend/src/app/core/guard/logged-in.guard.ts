import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../infrastructure/service/auth.service";
import { routesArray } from "../../views/routes/public.routes";
import { catchError, map, of } from "rxjs";

export const loggedInGuard: CanActivateFn = (route, state)  => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // if (authService.isLoggedIn()) {
    //     return true;
    // } else {
    //     router.navigate([routesArray[1]]); // login
    //     return false;
    // }
    
    return authService.getUserDetails().pipe(
        map(() => true),
        catchError(() => {
            router.navigate([routesArray[1]]); // login
            return of(false);
        })
    )
   

}
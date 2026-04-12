import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { routesArrayCommon } from "../../views/routes/common.routes";

export const loggedOutGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);

    // if (!authService.isLoggedIn()) {
    //     return true;
    // } else {
    //     router.navigate([routesArrayCommon[0]]); // home
    //     return false;
    // }

    const hasSession = localStorage.getItem('session');

    if (hasSession) {
        router.navigate([routesArrayCommon[0]]); // home
        return false;
    }

    return true;

}
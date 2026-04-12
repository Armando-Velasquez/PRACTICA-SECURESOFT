import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../infrastructure/service/auth.service";
import { inject } from "@angular/core";
import { DetailsUser } from "../../infrastructure/interface/session.interface";
import { routesArray } from "../../views/routes/public.routes";

export const roleGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const getUser: DetailsUser | null = authService.getSessionData();
    const role_user = getUser ? getUser.id_role : null; 

    const allowedRoles = (route.data as { allowedRoles: number[] })['allowedRoles']

    if (role_user !== null && allowedRoles && allowedRoles.includes(role_user)) {
        return true;
    } else {
        router.navigate([routesArray[0]]);
        return false;
    }
}
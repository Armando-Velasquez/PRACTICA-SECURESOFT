import { CanActivateFn, Router } from "@angular/router";
import { SystemService } from "../service/system.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { routesArray } from "../../views/routes/public.routes";

export const serverStatusGuard: CanActivateFn = (route, state) => {

    const systemService = inject(SystemService);
    const router = inject(Router);

    return systemService.checkServerStatus().pipe(
        tap( async (isServerUp: boolean) => {

            const isErro500 = state.url === routesArray[2]; // 500
            const isLogin = state.url === routesArray[1]; // login

            if (!isServerUp) {

                if (!isErro500 ) {
                    router.navigate([routesArray[2]]); // 500
                } else {
                    if (!isLogin) {
                        router.navigate([routesArray[1]]); // login
                    }
                }
            }

        } )
    )

}
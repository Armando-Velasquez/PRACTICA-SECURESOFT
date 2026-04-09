import { HttpInterceptorFn } from "@angular/common/http";
import { AppInjector } from "../../app";
import { JAlertDialogService, JAlertToastService, JErrorHandlerHttpService } from "tailjng";
import { AuthService } from "../../infrastructure/service/auth.service";
import { catchError, throwError } from "rxjs";


let errorTimeOut: any = null; // Controla el temporozador

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const alertToast = AppInjector.get(JAlertToastService)
    const authService = AppInjector.get(AuthService)
    const errorHandlerService = AppInjector.get(JErrorHandlerHttpService)

    return next(req).pipe(
        catchError((error) => {

            if (authService.isLogoutInProgress()) {
                return throwError(() => error);
            }

            // Manejo del servicio de errores
            const errorData = errorHandlerService.handleHttpError(error);
            const { type, title, message, persistent } = errorData;

            const showError = (type: string, title: string, message: string) => {
                if (!errorTimeOut) {
                    alertToast.AlertToast({
                        type: 'error',
                        title,
                        description: message,
                        autoClose: persistent,
                    });

                    console.log('Error handled by interceptor:', errorData);

                    errorTimeOut = setTimeout(() => {
                        errorTimeOut = null;
                    }, 5000)
                }
            }

            // Mostrar el error
            showError(type, title, message);

            return throwError(() => error);
        })
    )

} 
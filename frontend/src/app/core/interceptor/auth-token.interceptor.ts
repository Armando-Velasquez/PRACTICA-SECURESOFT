import { HttpInterceptorFn } from "@angular/common/http";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

    const authToken = localStorage.getItem('token');

    let headers = req.headers;

    if (authToken) {
        headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    const modifiedReq = req.clone({ headers });

    return next(modifiedReq);
}
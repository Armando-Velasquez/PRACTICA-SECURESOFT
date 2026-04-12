import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    // const authToken = localStorage.getItem('token');

    // let headers = req.headers;

    // if (authToken) {
    //     headers = headers.set('Authorization', `Bearer ${authToken}`);
    // }

    // const modifiedReq = req.clone({ headers });

    const modifiedReq = req.clone(
        { withCredentials: true }
    );

    return next(modifiedReq);
}
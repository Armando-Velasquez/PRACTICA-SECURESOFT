import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DetailsUser } from '../interface/session.interface';
import { routesArray } from '../../views/routes/public.routes';
import { TimeSessionService } from '../../core/service/time-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Endpoint
  url: string = `${environment.urlBase}${environment.urlAuth}`

  private sessionData: DetailsUser | null = null;
  private isLoggingOut: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly timeSessionService: TimeSessionService
  ) { }

  // Login User
  authenticate(formData: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, formData);
  }

  // Login Admin
  authenticateAdmin(formData: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/admin`, formData);
  }

  // Obtener detalles del usuario desde el token
  getUserDetails(overrrideTimeSession: boolean = false): Observable<any> {

    return this.http.get<any>(`${this.url}/token/detail`).pipe(

      tap(userData => {
        this.sessionData = {
          id_user: userData.data.id_user,
          firstname_user: userData.data.firstname_user,
          lastname_user: userData.data.lastname_user,
          id_role: userData.data.id_role,

          iat: userData.data.iat,
          exp: userData.data.exp,
        }

        // Crear la variable de sesión con los detalles del usuario
        if ((overrrideTimeSession === true) || (!localStorage.getItem('time-session'))) {
          localStorage.setItem('time-session', this.sessionData.exp);
        }
      }),

      catchError((error) => {
        this.logoutUser();
        return throwError(() => error)
      })
    )
  }

  // Logout User
  logoutUser() {
    return this.http.get<any>(`${this.url}/logout`).subscribe({
      next: (response) => {
        this.clearVarsSession();
        window.location.href = routesArray[1] // Login
      },
      error: (error) => {
        this.clearVarsSession();
        window.location.href = routesArray[1] // Login
      }
    })
  }


  // Renovar token
  renewToken(): Observable<any> {
    return new Observable<void>((observer) => {
      this.http.get<any>(`${this.url}/token/renew`).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          this.getUserDetails(true).subscribe({
            next: () => {
              if (this.sessionData?.exp) {
                const expTimeStamp = parseInt(this.sessionData.exp, 10)
                this.timeSessionService.resetCountdown();
                this.timeSessionService.startCountdown(expTimeStamp);
              }
              observer.next();
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            }
          })

        },
        error: (error) => {
          observer.error(error);
        }
      })
    })
  }


  // Clear Vars Session
  clearVarsSession() {
    this.sessionData = null;
    localStorage.removeItem('token');
    localStorage.removeItem('time-session');
  }

  // Obtener los datos del usuario
  getSessionData(): DetailsUser | null {
    return this.sessionData;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLogoutInProgress(): boolean {
    return this.isLoggingOut;
  }



  // Semilla de datos
  seed() {
    return this.http.get<any>(`${environment.urlBase}/seed`);
  }

}

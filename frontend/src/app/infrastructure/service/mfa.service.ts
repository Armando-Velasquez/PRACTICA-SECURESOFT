import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MfaService {

  // Endpoint
  url: string = `${environment.urlBase}${environment.urlMfa}`

  constructor(
    private readonly http: HttpClient,
  ) { }

  // Generar código QR para configurar MFA
  setup(): Observable<any> {
    return this.http.post<any>(`${this.url}/setup`, null);
  }

  // Habilitar MFA con el código generado por la app de autenticación
  enable(code: string): Observable<any> {
    return this.http.post<any>(`${this.url}/enable`, { code });
  }

  // Verificacion de código MFA
  verify(id_user: number, code: string): Observable<any> {
    return this.http.post<any>(`${this.url}/verify`, { id_user, code });
  }


}

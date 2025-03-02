import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../models/User/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}auth/login`, body).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
        }
      }),
      catchError(error => {
        console.error('❌ Error en login:', error);
        alert(`❌ Error en login: \nSTATUS: ${error.status} \nMENSAJE: ${error.message} \nURL: ${error.url}`);
        return of(null);
      })
    );
  }

  register(data: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, data).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido. Intenta nuevamente más tarde.';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifica los datos ingresados.';
          break;
        case 401:
          errorMessage = 'No autorizado. Verifica tus credenciales.';
          break;
        case 403:
          errorMessage = 'Acceso denegado.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 500:
          errorMessage = 'Error en el servidor. Intenta más tarde.';
          break;
        default:
          errorMessage = `Error inesperado (Código: ${error.status}).`;
      }
    }
    
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error(errorMessage));
  }
}

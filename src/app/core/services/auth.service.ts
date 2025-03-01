import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    alert(`${this.apiUrl}auth/login`)
    return this.http.post<any>(`http://10.0.2.2:3000/auth/login`, body).pipe(
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

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };

    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      catchError(error => {
        console.error('Error en registro', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

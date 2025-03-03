import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
        console.log('response--->', response)
        if (response.data.access_token) {
          console.log('response.data.access_token--->', response.data.access_token)
          localStorage.setItem('users', JSON.stringify(response.data.user));
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.access_token);
        }
      })
    );
  }

  register(data: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/register`, data).pipe(
      tap(response => {
        if (response.data.access_token) {
          localStorage.setItem('users',  response.data.user)
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
      })
    );
  }

  async getAccessToken() {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token')
    };
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/User/UserI';
import { ApiResponse } from '../models/api/apiResponse';
import { loginResponse } from '../models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  login(users: string, password: string): Observable<ApiResponse<loginResponse>> {
    const body = {users, password };
    
    return this.http.post<ApiResponse<loginResponse>>(`${this.apiUrl}auth/login`, body).pipe(
      tap((response: ApiResponse<loginResponse>) => {
        if (response.data && response.data.access_token) {
          console.log('response.data.access_token--->', response.data.access_token);
          this.saveAccessToken(response.data)
        }
      })
    );
  }
  register(data: IUser): Observable<ApiResponse<loginResponse>>{
    return this.http.post<any>(`${this.apiUrl}auth/register`, data).pipe(
      tap((response: ApiResponse<loginResponse>) => {
        if (response.data.access_token) {
          this.saveAccessToken(response.data)
        }
      })
    );
  }

  async saveAccessToken(data:loginResponse){
    localStorage.setItem('users', JSON.stringify(data.user ?? {})); 
    localStorage.setItem('access_token', data?.access_token ?? '');  
    localStorage.setItem('refresh_token', data?.refresh_token ?? ''); 
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

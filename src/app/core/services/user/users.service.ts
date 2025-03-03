import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../models/User/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}
  findOne(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}user/${id}`);
  }
}

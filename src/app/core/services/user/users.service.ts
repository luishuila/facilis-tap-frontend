import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';
import { UserDto, UserUpdateI } from '../../models/User/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}
  findOne(id: string): Observable<UserDto> {
    return this.http.get<ApiResponse<UserDto>>(`${this.apiUrl}user/${id}`).pipe(
      map((response:ApiResponse<UserDto>) => response.data) 
    );
  }

  update(id: string, data: UserUpdateI): Observable<UserDto> {
    return this.http.put<ApiResponse<UserDto>>(`${this.apiUrl}user/${id}`, data).pipe(
      map((response: ApiResponse<UserDto>) => response.data)
    );
  }
  
  updateImage(id: string, imgFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('img', imgFile, imgFile.name); 
    return this.http.patch<any>(`${this.apiUrl}user/img/${id}`, formData);

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto, UserUpdateI } from '../../models/User/UserI';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';
import { ProviderCreateDto, ProviderDto } from '../../models/Provider/ProviderI';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  create(providerData: ProviderCreateDto): Observable<ProviderDto> {
    return this.http.post<ApiResponse<ProviderDto>>(`${this.apiUrl}providers`,providerData).pipe(
      map((response:ApiResponse<ProviderDto>) => response.data) 
    );
  }

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
  

}

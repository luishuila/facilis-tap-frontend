import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto, UserUpdateI } from '../../models/User/UserI';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

    findOneAll() : Observable<any[]> {
      return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}employee/one-all`).pipe(
        map((response:ApiResponse<any[]>) => response.data) 
      );
    }
}

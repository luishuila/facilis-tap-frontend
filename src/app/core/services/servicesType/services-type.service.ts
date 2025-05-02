import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../models/api/apiResponse';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesTypeService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

   findAll() : Observable<any[]> {
     return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}servicesType`).pipe(
       map((response:ApiResponse<any[]>) => response.data) 
     );
   }
}

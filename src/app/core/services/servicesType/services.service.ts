import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../models/api/apiResponse';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}servicesType`).pipe(
      map((response: ApiResponse<any[]>) => response.data)
    );
  }



  findOne(id: number): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}servicesType/one-all/${id}`).pipe(
      map((response: ApiResponse<any[]>) => response.data)
    );
  }
  createMany(dtos: any[]) {
    return this.http.post(`${this.apiUrl}service`, dtos, { headers: { 'X-Raw-Body': '1' }});
  }
  create(data: any) {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}service`, data).pipe(
      map((response: ApiResponse<any>) => response.data)
    );
  }
  findOneAllServices(): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}service/one-all`).pipe(
      map((response: ApiResponse<any[]>) => response.data)
    );
  }

  update(id:number, data:any){
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}service/one-all`).pipe(
      map((response: ApiResponse<any[]>) => response.data)
    );
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';
import { EmployeeModelsCreate } from '../../models/employee/Employee.Model';
import { EmployeeCreate } from '../../models/employee/employee.interface';

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

    findIndependent() : Observable<EmployeeCreate> {
      return this.http.get<ApiResponse<EmployeeCreate>>(`${this.apiUrl}employee/independent`).pipe(
        map((response:ApiResponse<EmployeeCreate>) => response.data) 
      );
    }
    create(data:EmployeeModelsCreate) : Observable<EmployeeCreate>{
      return this.http.post<ApiResponse<EmployeeCreate>>(`${this.apiUrl}employee`,data).pipe(
        map((response:ApiResponse<EmployeeCreate>) => response.data) 
      );
    }

    update(){
      console.log('update-->')
      return null
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../models/api/apiResponse';
import { map, Observable } from 'rxjs';
import { TypeItem } from '../../models/util/util';
@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  findAllPropertyType(): Observable<TypeItem<string>[]> {
    return this.http.get<ApiResponse<TypeItem<string>[]>>(`${this.apiUrl}genericservice/propertyType`).pipe(
      map((response: ApiResponse<TypeItem<string>[]>) => response.data)
    );
  }



  findAllContractType(): Observable<TypeItem<string>[]> {
    return this.http.get<ApiResponse<TypeItem<string>[]>>(`${this.apiUrl}genericservice/contractType`).pipe(
      map((response: ApiResponse<TypeItem<string>[]>) => response.data)
    );
  }


  
}


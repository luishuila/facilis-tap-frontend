import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto, UserUpdateI } from '../../models/User/UserI';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';
import { CategoryDto, SubcategoryDto } from '../../models/category/category.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}


  getHome(
    lat: number,
    lon: number,
    page: number = 1,
    limit: number = 10,
    categoryId?: number,
    subcategoryId?: number
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId.toString());
    }
  
    if (subcategoryId !== undefined) {
      params = params.set('subcategoryId', subcategoryId.toString());
    }
  
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}home/nearby`, { params }).pipe(
      map((response: ApiResponse<any[]>) => response.data)
    );
  }
  

}

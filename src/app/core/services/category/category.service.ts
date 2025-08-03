import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto, UserUpdateI } from '../../models/User/UserI';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';
import { CategoryDto, SubcategoryDto } from '../../models/category/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}


  findAllCategory(): Observable<CategoryDto[]> {
    return this.http.get<ApiResponse<CategoryDto[]>>(`${this.apiUrl}category`).pipe(
      map((response:ApiResponse<CategoryDto[]>) => response.data) 
    );
  }
  findAllSubCategory(id:number): Observable<SubcategoryDto[]> {
    return this.http.get<ApiResponse<SubcategoryDto[]>>(`${this.apiUrl}subcategory/category/${id}`).pipe(
      map((response:ApiResponse<SubcategoryDto[]>) => response.data) 
    );
  }
}

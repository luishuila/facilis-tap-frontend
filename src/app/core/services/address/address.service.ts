import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressDtoI, AddressUdpatedDtoI, CityDto, CountryDto, StateCountryDto } from '../../models/address/AddressI';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  post(data: AddressUdpatedDtoI): Observable<AddressDtoI[]> {
    console.log('AddressService post data:', data);
    return this.http.post<ApiResponse<AddressDtoI[]>>(`${this.apiUrl}address`, data).pipe(
      map((response: ApiResponse<AddressDtoI[]>) => response.data)
    );
  }

  findCountry(): Observable<CountryDto[]> {
    return this.http.get<ApiResponse<CountryDto[]>>(`${this.apiUrl}country`).pipe(
      map((response: ApiResponse<CountryDto[]>) => response.data)
    );
  }
  
  findDepartmentsByCountry(countryId: string): Observable<StateCountryDto[]> {
    return this.http.get<ApiResponse<StateCountryDto[]>>(`${this.apiUrl}statecountry/${countryId}/country`).pipe(
      map((response: ApiResponse<StateCountryDto[]>) => response.data)
    );
  }
  
  findCityByDepartments(idDepartments: string): Observable<CityDto[]> {
    return this.http.get<ApiResponse<CityDto[]>>(`${this.apiUrl}citystate/${idDepartments}/state`).pipe(
      map((response: ApiResponse<CityDto[]>) => response.data)
    );
  }
  

  update(id: number | null | undefined, data: AddressUdpatedDtoI): Observable<AddressDtoI[]> {

    return this.http.put<ApiResponse<AddressDtoI[]>>(`${this.apiUrl}address/${id}`, data).pipe(
      map((response: ApiResponse<AddressDtoI[]>) => response.data)
    );
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressDtoI, AddressUdpatedDtoI, CityDto, CountryDto, StateCountryDto } from '../../models/address/IAddress';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}
  findCountry(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.apiUrl}country`);
  }

  findDepartmentsByCountry(countryId: string): Observable<StateCountryDto[]> {
    return this.http.get<StateCountryDto[]>(`${this.apiUrl}statecountry/${countryId}/country`);
  }
  findCityByDepartments(idDepartments: string): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(`${this.apiUrl}citystate/${idDepartments}/state`);
  }

  update(id:number|null, data:AddressUdpatedDtoI){
    return this.http.put<AddressDtoI[]>(`${this.apiUrl}address/${id}`,data);
  }
}

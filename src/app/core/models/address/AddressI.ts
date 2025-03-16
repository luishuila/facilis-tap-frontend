import { PropertyType } from "../../constant/enum";
import { BaseAddressModel } from "./BaseAddressModel";

export interface CountryDto {
    id: number;
    countryCode: string;
    countryName: string;
    countryContinent: string;
    stateCode: string;
    img: string | null;
  }
  export interface StateCountryDto {
    id: number;
    stateCode: string;
    stateName: string;
    regionState: string;
    countryCode: string;
    country: CountryDto
  }


  export interface CityDto {
    id: number;
    cityName: string;
    stateCode: string;
    state: StateCountryDto
  }
  
  export interface AddressDtoI  extends  BaseAddressModel{
    id: number | null;
    lat?: string | null;
    lon?: string | null;
    zipcode?: number | null;
    street?: string | null;
    race?: string | null;
    neighborhood?: string | null;
    description?: string | null;
    cityStates?:CityDto | null;
    stateCode?: string | null;
    providers?: number | null;
    propertyType?: PropertyType | null;
    users?: string | null;
    countryCode?: string | null;
}


export interface AddressUdpatedDtoI extends  BaseAddressModel {

}

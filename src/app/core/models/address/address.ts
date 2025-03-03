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
  
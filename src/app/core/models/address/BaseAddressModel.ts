import { PropertyType } from "../../constant/enum";
import { GenericModel } from "../../core/GenericModel";
import { CityDto } from "./AddressI";

export interface BaseAddressModel {
    lat?: string | null;
    lon?: string | null;
    zipcode?: number | null;
    street?: string | null;
    race?: string | null;
    neighborhood?: string | null;
    description?: string | null;
    cityStates?: CityDto| null;
    stateCode?: string | null;
    providers?: number | null;
    propertyType?: PropertyType | null;
  }

export class BaseAddress extends GenericModel<BaseAddressModel> {
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

  constructor(data: Partial<BaseAddressModel> = {}) {
    super(data);
  }
}
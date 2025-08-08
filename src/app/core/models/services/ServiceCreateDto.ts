import { BaseServiceModel } from "./BaseServiceModel";

export interface ServiceCreateDto extends BaseServiceModel {
    providers?: number | null; 
    servicesTypes?: number | null ;  
    employees?: string | number | null; 
  }
  
// export interface ServiceDto extends BaseServiceModel {
//   providers?: number | null; 
//   servicesTypes?: number | null ;  
//   employees?: string | number | null; 
// }
export class ServiceDto {
  id?: number;
  name?: string;
  description?: string | null;
  serviceTime?: string | null;
  price?: number | null;
  img?: string | null;

  providers?: any;
  appointments?: any;
  employeeServices?: any;
  employees?: any;
  subcategory?: any;
}
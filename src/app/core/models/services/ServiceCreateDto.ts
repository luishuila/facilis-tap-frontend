import { BaseServiceModel } from "./BaseServiceModel";

export interface ServiceCreateDto extends BaseServiceModel {
  name?: string| null;
  description?: string | null;
  serviceTime?: string | null;
  price?: number | null;

  // OJO: tu backend lo llama "providers" aunque es un solo ID
  providers?: number | null;
  img?: string | null;
  subcategory?: number | null;  // ID plano
  }
  // create-service.dto.ts (frontend)

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
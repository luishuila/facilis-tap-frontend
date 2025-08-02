import { BaseServiceModel } from "./BaseServiceModel";

export interface ServiceCreateDto extends BaseServiceModel {
    providers?: number | null; 
    servicesTypes?: number | null ;  
    employees?: string | number | null; 
  }
  
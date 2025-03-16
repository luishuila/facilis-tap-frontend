import { BaseProviderModel } from "./BaseProviderModel";


export interface ProviderCreateDto extends BaseProviderModel {
   userId?: string| null;

}

export interface ProviderDto extends BaseProviderModel{
  userId?: string| null;
  addresses: any[];
  openingHours: any[];
  services: any[];
  appointments: any[];
  servicesTypes: any[];
  employees: any[];
  reviews: any[];
}



/*
  addresses: any[];
  openingHours: any[];
  services: any[];
  appointments: any[];
  servicesTypes: any[];
  employees: any[];
  reviews: any[];
  */
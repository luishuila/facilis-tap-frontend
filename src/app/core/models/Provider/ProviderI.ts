import { AddressDto } from "../address/AddressI";
import { CategoryDto } from "../category/category.dto";
import { EmployeeDto } from "../employee/Employee.dto";
import { AppointmentDto } from "../Appointment/AppointmentDto";
import { ServiceDto } from "../services/ServiceCreateDto";

import { BaseProviderModel } from "./BaseProviderModel";
import { OpeningHourDto } from "../openingHour/OpeningHourDto";
import { UserDto } from "../User/User";



export interface ProviderCreateDto extends BaseProviderModel {
   userId?: string| null;
}

export interface ProviderDtoI extends BaseProviderModel{
  addresses?: AddressDto[];
  openingHours?: OpeningHourDto[];
  services?: ServiceDto[];
  appointments?: AppointmentDto[];
  categories?: CategoryDto[];
  employees?: EmployeeDto[];
  users?: any;
}

export class ProviderDto {
  id?: number; 
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  img?: string | null;
  website?: string | null;
  nit?: number | null;
  invima?: string | null;
  companyIdentifier?: string | null;
  logoUrl?: any | null;
  description?: string | null;
  status?: string | null;
  category?: string | null;
  rating?: number | null;
  independent?: boolean;
  
  addresses?: any;
  openingHours?: OpeningHourDto[];
  services?: ServiceDto[];
  appointments?: AppointmentDto[];
  categories?: CategoryDto[];
  employees?: EmployeeDto[];
  users?: any;
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
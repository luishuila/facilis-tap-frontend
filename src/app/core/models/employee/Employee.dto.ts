import { ContractTypeEnum } from "../../constant/enum";
import { AddressDtoI } from "../address/AddressI";

export interface EmployeeDto {
  id: number;
  idcard?: number | null;
  employeeCode?: string | null;
  position?: string | null;
  hireDate?: Date | null;
  salary?: number | null;
  status?: boolean;
  supervisor?: string | null;
  department?: string | null;
  independent?: boolean;
  contractType?: ContractTypeEnum | null;
  providers?: any;
  users?: any;
  appointments?: any;
  employeeStatus?: any;
  employeeServices?: any;
  services?: any;
  }
  
import { ContractTypeEnum } from "../../constant/enum";
import { AddressDtoI } from "../address/AddressI";

export interface EmployeeDto {
    id?: number;
    idcard?: number;
    employeeCode: string;
    position: string;
    hireDate: Date | string;
    salary: number;
    status: boolean;
    supervisor?: string;
    department: string;
    contractType: ContractTypeEnum;
    providersId?: number;
    usersId?:string;
    independent?: boolean;
    address:AddressDtoI
  }
  
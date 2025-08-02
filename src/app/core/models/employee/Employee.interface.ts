import { ContractTypeEnum } from "../../constant/enum";

export interface EmployeeCreate {
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
  }
  
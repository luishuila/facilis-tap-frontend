import { ContractTypeEnum } from "../../constant/enum";
import { EmployeeCreate } from "./employee.interface";


export class EmployeeModelsCreate {
  id?: number;
  idCard?: number;
  employeeCode?: string;
  position?: string;
  hireDate?: Date;
  salary?: number;
  independent?:boolean = false;
  status?: boolean = true;
  supervisor?: string;
  department?: string;
  contractType?: ContractTypeEnum;
  providersId?: number;
  usersId?:string;

  constructor(data: Partial<EmployeeCreate> = {}) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
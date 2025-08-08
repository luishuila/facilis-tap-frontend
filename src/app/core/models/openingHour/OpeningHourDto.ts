import { EmployeeDto } from "../employee/Employee.dto";
import { ProviderDto } from "../provider/ProviderI";
import { ServiceDto } from "../services/ServiceCreateDto";

export enum ServiceStatusEnum {
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  TEMPORALLY_CLOSE = 'TEMPORALLY_CLOSE',
  CLOSE = 'CLOSE'
}

export class OpeningHourDto {
  id?: number;
  day?: string;
  openDate?: Date | null;
  closeDate?: Date | null;
  description?: string | null;
  fullAccess?: boolean | null;
  status?: ServiceStatusEnum;
  workDay?: string[];
  provider?: ProviderDto ;
}
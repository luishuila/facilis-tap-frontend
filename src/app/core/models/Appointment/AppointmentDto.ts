import { EmployeeDto } from "../employee/Employee.dto";
import { ProviderDto } from "../provider/ProviderI";
import { ServiceDto } from "../services/ServiceCreateDto";
import { UserDto } from "../User/User";


export class AppointmentDto {
    id?: number;
    appointmentDate?: Date | null;
    appointmentOrder?: number;
    status?: boolean;
    users?: UserDto;
    providers?: ProviderDto;
    employees?: EmployeeDto;
    services?: ServiceDto;
  }
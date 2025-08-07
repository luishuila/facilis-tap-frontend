import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { contractType } from 'src/app/core/constant/constants';
import { ContractTypeEnum } from 'src/app/core/constant/enum';
import { usersData } from 'src/app/core/generate/idData';
import { EmployeeDto } from 'src/app/core/models/employee/Employee.dto';
import { EmployeeCreate } from 'src/app/core/models/employee/employee.interface';
import { EmployeeModelsCreate } from 'src/app/core/models/employee/Employee.Model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ProviderService } from 'src/app/core/services/provider/provider.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: false,
})
export class EmployeeFormComponent  implements OnInit {
  @Input() independent:boolean = true;
  @Input() employeeData:any;
  @Input() employeeForm!: FormGroup; 
  @Output() employeeEmitter = new EventEmitter<any>();
  @Input() employee: EmployeeCreate|EmployeeDto =  {} as EmployeeCreate;
  @Input() providersList:any;
  contractTypes;
  constructor() {
    this.contractTypes =contractType;
   
  }
  ngOnInit() {

  }


  onSubmit() {
      this.employeeEmitter.emit(this.employeeForm.value)
  }
}
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
  @Output() employeeSaved = new EventEmitter<any>();
  employeeForm: FormGroup;
  contractTypes;
  providersList: any[] = []; 
  employee: EmployeeCreate|EmployeeDto =  {} as EmployeeCreate;
  
  constructor(private fb: FormBuilder, private providerService:ProviderService, private employeeService:EmployeeService) {
    this.contractTypes =contractType;
    if(!this.independent){
      this.providerService.findOneAll().subscribe(data=>{
        this.providersList = data
      })
    }
    this.employeeForm = this.fb.group({
      idcard: [''],
      employeeCode: [''],
      position: [''],
      hireDate: [''],
      salary: [''],
      status: [true],
      supervisor: [''],
      department: [''],
      contractType: [''],
      providersId: [null , this.independent ? null: null],
      usersId: ['', this.independent ? null: null],
    });
  }

  ngOnInit() {
    if(this.independent){
      this.contractTypes =contractType
    }else{
      this.contractTypes =contractType.filter(data=> data.value == ContractTypeEnum.FREELANCE);
      this.employeeForm.patchValue({
        employeeCode:usersData().uiid,
        contractType:ContractTypeEnum.FREELANCE
      })
      this.employeeService.findIndependent().subscribe(data => {
        this.employeeForm.patchValue({
          employeeCode:data.employeeCode,
          usersId:data.usersId,
          idcard:data.idcard,
          department:data.department,
          position:data.position,
          supervisor:data.supervisor
        })
        this.employee = data
        this.employeeSaved.emit(data)
      })
    }
    
  }


  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = {
        ...this.employeeForm.value,

      };
      const employeeModels:EmployeeModelsCreate= new EmployeeModelsCreate({  ...this.employeeForm.value})
      
      if(!this.independent){
        employeeModels.independent = true;
        employeeModels.usersId = usersData().uiid
        employeeModels.hireDate = undefined;
        employeeModels.salary = undefined;
        employeeModels.providersId = undefined;
      }
      this.employeeService.create(employeeModels).subscribe(data=>this.employee = data)
      if(!this.employee.id){
         
      }else{
        this.employeeService.update();
      }
      this.employeeSaved.emit(this.employeeService)
    }
  }
}
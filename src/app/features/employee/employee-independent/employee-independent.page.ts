import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address/Address';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { EmployeeDto } from 'src/app/core/models/employee/Employee.dto';
import { EmployeeCreate } from 'src/app/core/models/employee/employee.interface';
import { TypeItem } from 'src/app/core/models/util/util';
import { AddressService } from 'src/app/core/services/address/address.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { GenericServiceService } from 'src/app/core/services/genericService/generic-service.service';
import { AddressFormComponent } from '../../address/components/address-form/address-form.component';
import { IonSegment, ViewDidEnter } from '@ionic/angular';
import { ContractTypeEnum } from 'src/app/core/constant/enum';
import { ProviderCreate } from 'src/app/core/models/provider/Provider';
import { usersData } from 'src/app/core/generate/idData';
import { genderObject } from 'src/app/core/constant/constants';
import { UserDto } from 'src/app/core/models/User/UserI';
@Component({
  selector: 'app-employee-Independent',
  templateUrl: './employee-Independent.page.html',
  styleUrls: ['./employee-Independent.page.scss'],
  standalone: false,
})
export class EmployeeIndependentPage implements OnInit {
  @ViewChild('addressFormComponent') addressFormComponent!: AddressFormComponent;
  employee: EmployeeDto|EmployeeCreate =  {} as EmployeeDto;
  addressForm!: FormGroup;
  employeeForm!: FormGroup; 
  addressId: number | null| undefined = null;
  addressValidate = true;
  propertyType:TypeItem<string>[]|[] = [];
  providerForm!: FormGroup;
   userForm!: FormGroup;
   addressProviderForm!: FormGroup;
   validate: boolean = false;
   validateUsers: boolean = false;
   userValidate = true;
   addProveder = false;
   selectedSegment: string = 'register';
   genderOptions = genderObject;
   user!: UserDto;
  @ViewChild(IonSegment, { static: false }) segment!: IonSegment;
   independent:boolean = true;;
   dataProvider:ProviderCreate = new ProviderCreate() ; 


  constructor(private fb: FormBuilder, private addressService: AddressService,
    private genericServiceService: GenericServiceService,
    private employeeService:EmployeeService
  ) {
    this.genericServiceService.findAllPropertyType().subscribe(data => this.propertyType = data)     
    this.addressForm = this.fb.group({
          countryCode: [''],
          stateCode: [''],
          cityStates: [null],
          lat: ['', [Validators.required]],
          lon: [''],
          street: [''],
          race: [''],
          neighborhood: [''],
          description: [''],
          zipcode: [''],
          propertyType: [''],
    });
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
      providersId: [null],
      usersId: [''],
    });

    this.providerForm = this.fb.group({
          name: [''],
          email: [''],
          phone: [''],
          img: [''],
          website: [''],
          nit: [null],
          invima: [''],
          companyIdentifier: [''],
          logoUrl: [''],
          description: [''],
          categories:[[]],
          independent:[false]
     });
   }
   ionViewDidEnter() {

    // if (this.employee.address) {
    //   this.addressFormComponent?.evento();
    // }
  }
  onAddressSaved(address?: AddressDtoI) {
    if (this.addressForm.invalid) {
      Object.values(this.addressForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    const data = new Address({ ...address })
    this.addressService.update(this.addressId, data).subscribe(dat => {
      console.log('dat', dat)
    })
    this.addressValidate = this.addressForm.invalid
    console.log('data', data)
  }
  onSegmentChanger(event: EmployeeDto | EmployeeCreate) {
    this.employee = event;
    console.log('event', event)
    if ('address' in event && event.address) { 
      this.addressId = event.address.id;
      this.addressForm.patchValue({
        ...event.address,
        cityStates: event.address.cityStates?.id ?? null
      });
      this.addressFormComponent.evento(); 
    }
  }
  ngOnInit() {
    this.employeeService.findIndependent().subscribe(data => {
      console.log('findIndependent-->', data)
      this.employeeForm.patchValue({
        employeeCode:data.employeeCode,
        usersId:data.usersId,
        idcard:data.idcard,
        department:data.department,
        position:data.position,
        supervisor:data.supervisor
      })
      this.employee = data

    })
    this.employeeForm.patchValue({
      contractType:ContractTypeEnum.FREELANCE
    })
    // this.employeeService.findIndependent().subscribe(data => {
    //   this.employee = data
    // })
  }
  onSegmentChangers(event:any,expr:number){
      console.log('event-->', event)
      switch (expr) {
        case 1:
          if (this.providerForm.invalid) {
            Object.values(this.providerForm.controls).forEach(control => control.markAsTouched());
            return;
          }
          this.dataProvider = new ProviderCreate({ ...event ,userId:usersData().id })
          this.selectedSegment = 'addressProvider'
          break;
        case 2:
          if (this.addressProviderForm.invalid) {
            Object.values(this.addressProviderForm.controls).forEach(control => control.markAsTouched());
            return;
          }
          const data = new Address({ ...event })
          if (!this.dataProvider.addresses) {
            this.dataProvider.addresses = [];
          }
          console.log('onSegmentChanger--->',data)
          this.dataProvider.addresses = [data]
          console.log('dataProvider--->',this.dataProvider)
          this.onProviderSaved( this.dataProvider)
          break
      }
      console.log('dataProvider',this.dataProvider)
    }
    onProviderSaved(event:any){

    }
}

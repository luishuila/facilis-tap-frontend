import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address/Address';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { EmployeeDto } from 'src/app/core/models/employee/Employee.dto';
import { EmployeeCreate } from 'src/app/core/models/employee/employee.interface';
import { TypeItem } from 'src/app/core/models/util/util';
import { AddressService } from 'src/app/core/services/address/address.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { GenericServiceService } from 'src/app/core/services/genericService/generic-service.service';

@Component({
  selector: 'app-employee-Independent',
  templateUrl: './employee-Independent.page.html',
  styleUrls: ['./employee-Independent.page.scss'],
  standalone: false,
})
export class EmployeeIndependentPage implements OnInit {
  employee: EmployeeDto|EmployeeCreate =  {} as EmployeeDto;
  addressForm!: FormGroup;
  addressId: number | null | undefined ;
  addressValidate = true;
  propertyType:TypeItem<string>[]|[] = [];
  constructor(private fb: FormBuilder, private addressService: AddressService,
    private genericServiceService: GenericServiceService
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
  
    if ('address' in event && event.address) {
      this.addressId = event.address.id;
      this.addressForm.patchValue({
        ...event.address,
        cityStates: event.address.cityStates?.id ?? null
      });
    }
  }
  ngOnInit() {
    // this.employeeService.findIndependent().subscribe(data => {
    //   this.employee = data
    // })
  }

}

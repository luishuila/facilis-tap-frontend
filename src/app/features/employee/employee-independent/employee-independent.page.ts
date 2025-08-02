import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/models/address/Address';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { EmployeeCreate } from 'src/app/core/models/employee/employee.interface';
import { AddressService } from 'src/app/core/services/address/address.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-employee-Independent',
  templateUrl: './employee-Independent.page.html',
  styleUrls: ['./employee-Independent.page.scss'],
  standalone: false,
})
export class EmployeeIndependentPage implements OnInit {
  employee: EmployeeCreate =  {} as EmployeeCreate;
  addressForm!: FormGroup;
  addressId: number | null = 0;
  addressValidate = true;
  
  constructor(private fb: FormBuilder, private addressService: AddressService) {
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
  onSegmentChanger(event:EmployeeCreate){
    this.employee = event;
  }
  ngOnInit() {
    // this.employeeService.findIndependent().subscribe(data => {
    //   this.employee = data
    // })
  }

}

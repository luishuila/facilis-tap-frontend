import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genderObject } from 'src/app/core/constant/constants';
import { idUsers, usersData } from 'src/app/core/generate/idData';
import { Address } from 'src/app/core/models/address/Address';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { UserDto, UserUpdate, UserUpdateI } from 'src/app/core/models/User/User';
import { AddressService } from 'src/app/core/services/address/address.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { initializeAddressForm } from 'src/app/core/util/initializeAddressForm';
@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.page.html',
  styleUrls: ['./users-update.page.scss'],
  standalone: false,
})
export class UsersUpdatePage implements OnInit {
  segmentValue: string = 'first';
  addressForm!: FormGroup;
  userForm!: FormGroup;
  validate: boolean  = false;
  addressId:number| null = 0;
  validateUsers: boolean  = false;
  propertyType = [
    { value: "HOUSE", label: 'House' },
    { value: "APARTMENT", label: 'Apartment' },
    { value: "BUILDING", label: 'Building' },
    { value: "COMMERCIAL_SPACE", label: 'Commercial Space' }
  ];


  genderOptions = genderObject;
  user!: UserDto;
  constructor(private fb: FormBuilder, private userService: UsersService, 
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.loadUser()
    this.addressForm = this.fb.group({
      countryCode: [''],
      stateCode: [''],
      cityStates: [null],
      lat: [''],
      lon: [''],
      street: [''],
      race: [''],
      neighborhood: [''],
      description: [''],
      zipcode: [''],
      propertyType: [''],

    });

    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }], 
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [ Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      phones:['',[ Validators.minLength(5), Validators.pattern('^[0-9]+$')] ],
      nit: [null, [Validators.minLength(5),,  Validators.pattern('^[0-9]+$')]] 
    });

  }
  

  loadUser() {
    this.userService.findOne(usersData().id).subscribe((data: UserDto) => {
      this.validate = true;
  
      if (data) {
        this.userForm.patchValue({
          ...data, 
          birth: data.birth ? new Date(data.birth).toISOString().split('T')[0] : ''
        });
        
        const address = data.addresses?.[0] ?? {} as Partial<AddressDtoI>;
        this.addressId =  data.addresses?.[0].id || 0;

        this.addressForm.patchValue({ 
          ...address,
          cityStates: address.cityStates?.id 
        });

        this.validateUsers = true
      }
    });
  }

  onUserSaved(userData: UserUpdateI) {


    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const data = new UserUpdate({...userData})
    this.userService.update(usersData().id,data).subscribe(data=>{
      console.log(data)
    })

 
  }

  onAddressSaved(address: AddressDtoI) {

    const data = new Address({...address})
    this.addressService.update(this.addressId, data).subscribe(dat=>{
      console.log('dat',dat)
    })
    console.log('data', data)
  }
}
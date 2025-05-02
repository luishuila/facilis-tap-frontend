import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genderObject } from 'src/app/core/constant/constants';
import { usersData } from 'src/app/core/generate/idData';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { UserDto, UserUpdateI } from 'src/app/core/models/User/UserI';
import { UserUpdate } from 'src/app/core/models/User/User';
import { AddressService } from 'src/app/core/services/address/address.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { Address } from 'src/app/core/models/address/Address';
import { ProviderCreateDto } from 'src/app/core/models/Provider/ProviderI';
import { IonSegment } from '@ionic/angular';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MenuService } from 'src/app/core/services/util/menu.service';
import { ProviderCreate } from 'src/app/core/models/Provider/Provider';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-administrator-menu',
  templateUrl: './administrator-menu.page.html',
  styleUrls: ['./administrator-menu.page.scss'],
  standalone: false
})
export class AdministratorMenuPage implements OnInit {
  addressForm!: FormGroup;
  userForm!: FormGroup;
  providerForm!: FormGroup;
  addressProviderForm!: FormGroup;
  validate: boolean = false;
  addressId: number | null = 0;
  validateUsers: boolean = false;
  propertyType = [
    { value: "HOUSE", label: 'House' },
    { value: "APARTMENT", label: 'Apartment' },
    { value: "BUILDING", label: 'Building' },
    { value: "COMMERCIAL_SPACE", label: 'Commercial Space' }
  ];

  userValidate = true;
  addressValidate = true;
  selectedSegment: string = 'register';
  genderOptions = genderObject;
  user!: UserDto;
  @ViewChild(IonSegment, { static: false }) segment!: IonSegment;
  constructor(private fb: FormBuilder, private userService: UsersService,
    private addressService: AddressService,
    private providerService: ProviderService,
    private menuService: MenuService,
    private _activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUser()
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

    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      phones: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')]],
      nit: [null, [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')]]
    });

    this.providerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      img: [''],
      website: ['',[Validators.required]],
      nit: [null, Validators.required],
      invima: [''],
      companyIdentifier: [''],
      logoUrl: [''],
      description: ['']
    });

    this.addressProviderForm = this.fb.group({
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
  
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      console.log(this._activatedRoute.snapshot.paramMap.get('id'))
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
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
        this.addressId = data.addresses?.[0].id || 0;
        this.addressForm.patchValue({
          ...address,
          cityStates: address.cityStates?.id
        });


        this.userValidate = this.userForm.invalid
        this.addressValidate = this.addressForm.invalid
        this.validateUsers = true;

        if (this.userForm.invalid) {
          Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
          return;
        }
        if (this.addressForm.invalid) {
          Object.values(this.addressForm.controls).forEach(control => control.markAsTouched());
          return;
        }
      }
    });


  }

  onUserSaved(userData?: UserUpdateI) {


    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const data = new UserUpdate({ ...userData })
    this.userService.update(usersData().id, data).subscribe(data => {
      console.log(data)
    })
    this.userValidate = this.userForm.invalid

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

  onProviderSaved(provider: ProviderCreateDto) {

 
    if (this.providerForm.invalid) {
      Object.values(this.providerForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    const data = new ProviderCreate({ ...provider ,userId:usersData().id })
    this.providerService.create(data).subscribe((response:any) => {
      console.log('data--->', response.users[0])
      localStorage.setItem('users', JSON.stringify(response.users[0] ?? {})); 
      this.menuService.loadInitialMenu();
      this.onSegment('addressProvider')
    })

  }

  onSegment(event:string){
    setTimeout(() => {
      if (this.segment) {
        this.segment.value = event; 
        this.selectedSegment = event;
      }},1000)
  }
}



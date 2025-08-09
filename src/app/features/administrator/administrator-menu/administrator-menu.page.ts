import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genderObject } from 'src/app/core/constant/constants';
import { usersData } from 'src/app/core/generate/idData';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { UserDto, UserUpdate, UserUpdateI } from 'src/app/core/models/User/User';
import { AddressService } from 'src/app/core/services/address/address.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { Address } from 'src/app/core/models/address/Address';
import { ProviderCreateDto, ProviderDto } from 'src/app/core/models/provider/ProviderI';
import { IonSegment } from '@ionic/angular';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MenuService } from 'src/app/core/services/util/menu.service';
import { ProviderCreate } from 'src/app/core/models/provider/Provider';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericServiceService } from 'src/app/core/services/genericService/generic-service.service';
import { TypeItem } from 'src/app/core/models/util/util';
import { roleEnum } from 'src/app/core/constant/enum';
@Component({
  selector: 'app-administrator-menu',
  templateUrl: './administrator-menu.page.html',
  styleUrls: ['./administrator-menu.page.scss'],
  standalone: false
})
export class AdministratorMenuPage implements OnInit {
  subSegment: string = 'usersId';
  
  addressForm!: FormGroup;
  userForm!: FormGroup;
  providerForm!: FormGroup;
  addressProviderForm!: FormGroup;
  validate: boolean = false;
  addressId: number | null = 0;
  validateUsers: boolean = false;
  propertyType:TypeItem<string>[]|[] = [];
  imgFile: File | any;
  fileCova: File[] | any;
  userValidate = true;
  addressValidate = true;
  addProveder = false;
  selectedSegment: string = 'register';
  genderOptions = genderObject;
  user!: UserDto;
  @ViewChild(IonSegment, { static: false }) segment!: IonSegment;
   independent:boolean = true;;
  constructor(private fb: FormBuilder, private userService: UsersService,
    private addressService: AddressService,
    private providerService: ProviderService,
    private menuService: MenuService,
    private _activatedRoute:ActivatedRoute,
     private router: Router,
     private genericServiceService: GenericServiceService
  ) {
    this.independent = !usersData().validateRoles(roleEnum.INDEPENDENT);
    this.genericServiceService.findAllPropertyType().subscribe(data => this.propertyType = data) 
   }

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
      independent:[!usersData().validateRoles(roleEnum.INDEPENDENT)]
    });

    this.addressProviderForm = this.fb.group({
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
 
 
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      console.log(this._activatedRoute.snapshot.paramMap.get('id'))
    }
    this.selectedSegment = this.userValidate || this.addressValidate ? 'first' : 'register';

    this.subSegment = 'usersId';
    console.log('this.userValidate-->', this.userValidate)
    console.log('this.addressValidate-->', this.addressValidate)
    if (this.userValidate && this.addressValidate) {
      this.selectedSegment = 'register';
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

    if(this.addressId != 0){
      this.addressService.update(this.addressId, data).subscribe(dat => {
        console.log('dat', dat)
      })
    }else{
      this.addressService.post(data).subscribe(dat => {
        console.log('dat', dat)
      })
    }

    this.addressValidate = this.addressForm.invalid
    console.log('data', data)
  }


  onAddressProviderSaved(addressProvider?: AddressDtoI) {

    if (this.addressProviderForm.invalid) {
      Object.values(this.addressProviderForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    const data = new Address({ ...addressProvider })
  }
  dataProvider:ProviderCreate = new ProviderCreate() ; 
  onSegmentChanger(event:any,expr:number){
    console.log('event-onSegmentChanger->', event)

    this.dataProvider = new ProviderCreate({ ...event.data ,userId:usersData().id })
    this.imgFile = event.avatarFile;
    this.fileCova = event.fileItems;
    console.log('event-->', event)
    this.onProviderSaved( this.dataProvider)
    // switch (expr) {
    //   case 1:
    //     if (this.providerForm.invalid) {
    //       Object.values(this.providerForm.controls).forEach(control => control.markAsTouched());
    //       return;
    //     }
    //     this.dataProvider = new ProviderCreate({ ...event ,userId:usersData().id })
    //     this.selectedSegment = 'addressProvider'
    //     break;
    //   case 2:
    //     if (this.addressProviderForm.invalid) {
    //       Object.values(this.addressProviderForm.controls).forEach(control => control.markAsTouched());
    //       return;
    //     }
    //     const data = new Address({ ...event })
    //     if (!this.dataProvider.addresses) {
    //       this.dataProvider.addresses = [];
    //     }
    //     console.log('onSegmentChanger--->',data)
    //     this.dataProvider.addresses = [data]
    //     console.log('dataProvider--->',this.dataProvider)
    //     this.onProviderSaved( this.dataProvider)
    //     break
    // }
    // console.log('dataProvider',this.dataProvider)
  }
  onProviderSaved(provider: ProviderCreateDto) {

  //   if (this.providerForm.invalid) {
  //     Object.values(this.providerForm.controls).forEach(control => control.markAsTouched());
  //     return;
  //   }
  //  this.selectedSegment = 'addressProvider'
  //   if (this.addressForm.invalid) {
  //     Object.values(this.addressForm.controls).forEach(control => control.markAsTouched());
  //     return;
  //   }
    
    const data = new ProviderCreate({ ...provider ,userId:usersData().id })
    this.addProveder = true;
    data.toJson().logoUrl = null;
    console.log('create-->')
    this.providerService.create(data).subscribe((response:ProviderDto) => {
      console.log('create-->')
      localStorage.setItem('users', JSON.stringify(response.users[0] ?? {})); 
      this.providerService.updateImage(this.imgFile,this.fileCova, response.id).subscribe(data=>{
        console.log('updateImage-->')
        // this.menuService.loadInitialMenu();
        // this.onSegment('addressProvider')
        // this.router.navigate([`navigation/services/${response.id}`]); 
        this.addProveder = false;
      })
  
    },(erro)=>{console.log('erro',erro)})
    // this.addProveder = false;
  }

  onSegment(event:string){
    setTimeout(() => {
      if (this.segment) {
        this.segment.value = event; 
        this.selectedSegment = event;
      }},1000)
  }
}



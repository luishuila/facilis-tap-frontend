import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { genderObject } from 'src/app/core/constant/constants';
import { usersData } from 'src/app/core/generate/idData';
import { Address } from 'src/app/core/models/address/Address';
import { AddressDtoI } from 'src/app/core/models/address/AddressI';
import { UserDto, UserUpdate, UserUpdateI } from 'src/app/core/models/User/User';
import { AddressService } from 'src/app/core/services/address/address.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.page.html',
  styleUrls: ['./users-update.page.scss'],
  standalone: false,
})
export class UsersUpdatePage implements ViewWillEnter {
  segmentValue: string = 'first';

  addressForm!: FormGroup;
  userForm!: FormGroup;

  // Flags de render
  validate = false;        // <- habilita AddressForm (dirección)
  validateUsers = false;   // <- habilita UpdateUsersInformation (perfil)

  addressId: number | null = 0;

  propertyType = [
    { value: 'HOUSE', label: 'House' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'BUILDING', label: 'Building' },
    { value: 'COMMERCIAL_SPACE', label: 'Commercial Space' },
  ];

  genderOptions = genderObject;
  user!: UserDto;

  private isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private addressService: AddressService
  ) {
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
      nickname: ['', [Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      phones: ['', [Validators.minLength(5), Validators.pattern('^[0-9]+$')]],
      nit: [null, [Validators.minLength(5), Validators.pattern('^[0-9]+$')]],
    });
  }

  ionViewWillEnter() {
    // asegura orden de montaje cada vez que entras
    this.validateUsers = false;
    this.validate = false;
    this.loadUser();
  }

  private loadUser() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.userService.findOne(usersData().id).subscribe({
      next: (data: UserDto) => {
        if (!data) {
          this.validateUsers = false;
          this.validate = false;
          return;
        }

        // 1) PERFIL (primero)
        this.userForm.patchValue({
          ...data,
          birth: data.birth ? new Date(data.birth).toISOString().split('T')[0] : '',
        });
        this.validateUsers = true;

        // 2) DIRECCIÓN (después)
        const address = (data.addresses?.[0] ?? {}) as Partial<AddressDtoI>;
        this.addressId = data.addresses?.[0]?.id ?? 0;

        this.addressForm.patchValue({
          countryCode: address.countryCode ?? '',
          stateCode: address.stateCode ?? '',
          cityStates: address.cityStates?.id ?? null,
          lat: address.lat ?? '',
          lon: address.lon ?? '',
          street: address.street ?? '',
          race: address.race ?? '',
          neighborhood: address.neighborhood ?? '',
          description: address.description ?? '',
          zipcode: address.zipcode ?? '',
          propertyType: address.propertyType ?? '',
        });

        // Habilita AddressForm al final (pequeño defer para evitar parpadeos)
        setTimeout(() => (this.validate = true), 0);
      },
      error: (err) => {
        console.error('Error cargando usuario:', err);
        this.validateUsers = false;
        this.validate = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onUserSaved(userData: UserUpdateI) {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach((c) => c.markAsTouched());
      return;
    }

    const data = new UserUpdate({ ...userData });
    this.userService.update(usersData().id, data).subscribe((res) => {
      console.log('Usuario actualizado', res);
    });
  }

  onAddressSaved(address: AddressDtoI) {
    const data = new Address({ ...address });
    this.addressService.update(this.addressId, data).subscribe((res) => {
      console.log('Dirección actualizada', res);
    });
  }
}

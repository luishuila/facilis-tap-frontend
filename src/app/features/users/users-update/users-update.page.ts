import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { idUsers, usersData } from 'src/app/core/generate/idData';
import { UserDto } from 'src/app/core/models/User/IUser';
import { UsersService } from 'src/app/core/services/user/users.service';
@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.page.html',
  styleUrls: ['./users-update.page.scss'],
  standalone: false,
})
export class UsersUpdatePage implements OnInit {

  addressForm!: FormGroup;
  userForm!: FormGroup;

  departments = [
    { value: 'antioquia', label: 'Antioquia' },
    { value: 'cundinamarca', label: 'Cundinamarca' },
    { value: 'santander', label: 'Santander' },
  ];
  cities = [
    { value: 'medellin', label: 'Medellín' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'cali', label: 'Cali' },
  ];
  propertyType = [
    { value: "HOUSE", label: 'House' },
    { value: "APARTMENT", label: 'Apartment' },
    { value: "BUILDING", label: 'Building' },
    { value: "COMMERCIAL_SPACE", label: 'Commercial Space' }
  ];


  genderOptions = [
    { label: 'Masculino', value: 'Male' },
    { label: 'Femenino', value: 'Female' },
    { label: 'Otro', value: 'Other' }
  ];

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit() {
    this.loadUser()
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      stateCountries: ['', Validators.required],
      cityState: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
      length: ['', [Validators.required, Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
      street: ['', [Validators.required, Validators.maxLength(50)]],
      race: ['', [Validators.required, Validators.maxLength(100)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      propertyType: ['', Validators.required],
    });

    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }], 
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [ Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      phones:['',[ Validators.minLength(5), Validators.pattern('^[0-9]+$')] ],
      nit: ['', [ Validators.minLength(5), Validators.pattern('^[0-9]+$')]] 
    });

    
  }
  user!: UserDto;

  loadUser() {
   
    this.userService.findOne(usersData().id).subscribe((data: UserDto) => {
      if (data) {
        this.userForm.patchValue({
          id: data.id || '', // UUID del usuario (deshabilitado)
          name: data.name || '',
          lastname: data.lastname || '',
          username: data.username || '',
          email: data.email || '',
          nickname: data.nickname || '',
          gender: data.gender || '',
          birth: data.birth ? new Date(data.birth).toISOString().split('T')[0] : '', // Formato YYYY-MM-DD
          phones: data.phones || '',
          nit: data.nit || ''
        });
      }
      console.log('Datos recibidos del usuario:', data);
    });
    
  }

  onUserSaved(userData: any) {
    console.log('Usuario actualizado:', userData);
 
  }

  onAddressSaved(address: any) {
    console.log('Dirección Guardada:', address);
  }
}
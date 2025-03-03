import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.page.html',
  styleUrls: ['./administrator-form.page.scss'],
  standalone: false
})
export class AdministratorFormPage implements OnInit {

  addressForm!: FormGroup;
  countries = [
    { value: 'colombia', label: 'Colombia' },
    { value: 'mexico', label: 'México' },
    { value: 'argentina', label: 'Argentina' },
  ];
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
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      department: ['', Validators.required],
      cityState: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
      length: ['', [Validators.required, Validators.pattern('^-?\\d{1,3}\\.\\d+$')]],
      street: ['', [Validators.required, Validators.maxLength(50)]],
      race: ['', [Validators.required, Validators.maxLength(100)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      propertyType: ['', Validators.required],
    });
  }

  onAddressSaved(address: any) {
    console.log('Dirección Guardada:', address);
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CityDto, CountryDto, StateCountryDto } from 'src/app/core/models/address/address';
import { AddressService } from 'src/app/core/services/address/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: false,
})
export class AddressFormComponent {
  @Input() addressForm!: FormGroup; 
  @Input() propertyType: { value: string; label: string }[] = [];
  @Output() addressSaved = new EventEmitter<any>();


  countries:CountryDto[] = [];
  cities: CityDto[] = [];
  departments: StateCountryDto[] = [];



  constructor(private addressService: AddressService) {
    this.addressService.findCountry().subscribe(data => {
      this.countries = data
    });
    

  }

  errorMessage: string = '';

  saveAddress() {
    if (this.addressForm.invalid) {
      Object.values(this.addressForm.controls).forEach((datos:any)=>{
       datos.markAsTouched();
      })
      return ;
    }
    if (this.addressForm.valid) {
      this.addressSaved.emit(this.addressForm.value);
    } else {
      this.errorMessage = 'Por favor, corrija los errores en el formulario.';
    }
  }

  onCountrySelected(event: any) {
    const selectedCountryId = event.detail.value;
    console.log('País seleccionado:', selectedCountryId);
    if(selectedCountryId == undefined){
      return;
    }
    // Limpiar departamentos antes de actualizar
    this.departments = [];
    this.addressForm.controls['stateCountries'].setValue('');

    this.addressService.findDepartmentsByCountry(selectedCountryId).subscribe(data => {
      this.departments = data
    });
  }

  onDepartmentsSelected(event: any) {
    const selectedDepartmentsId = event.detail.value;
    console.log('selectedDepartmentsId:', selectedDepartmentsId);
    if(selectedDepartmentsId == undefined){
      return;
    }
    this.cities = [];
    
    this.addressForm.controls['cityState'].setValue('');
    this.addressService.findCityByDepartments(selectedDepartmentsId).subscribe(data => {
      this.cities = data
    });

  }
}

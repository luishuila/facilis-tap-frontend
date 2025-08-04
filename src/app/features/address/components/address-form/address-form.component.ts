import { Component, EventEmitter, Input, Output ,OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CityDto, CountryDto, StateCountryDto } from 'src/app/core/models/address/AddressI';
import { AddressService } from 'src/app/core/services/address/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: false,
})
export class AddressFormComponent implements OnChanges {
  @Input() addressForm!: FormGroup; 
  @Input() propertyType: { value: string; label: string }[] = [];
  @Output() addressSaved = new EventEmitter<any>();
  @Input() isDisabled:boolean = false;

  countries:CountryDto[] = [];
  cities: CityDto[] = [];
  departments: StateCountryDto[] = [];



  constructor(private addressService: AddressService) {
    this.addressService.findCountry().subscribe(data => {
      this.countries = data

    });
  }
  ngOnChanges() {
 
    // navigator.geolocation.getCurrentPosition(
    //   function(position) {
    //     console.log("Latitud:", position.coords.latitude);
    //     console.log("Longitud:", position.coords.longitude);
    //   },
    //   function(error) {
    //     console.error("Error obteniendo ubicación:", error.message);
    //   }
    // );
   
      if(this.addressForm.value.countryCode){
           this.onCountrySelected(null, this.addressForm.value.countryCode)
      }
      if(this.addressForm.value.stateCode){
        this.onDepartmentsSelected(null,  this.addressForm.value.stateCode)
      }
    
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

  onCountrySelected(event: any,id:any ) {
    let selectedCountryId :any
    if (!event || !event.detail || !event.detail.value) {
      selectedCountryId= id
    }else{
      selectedCountryId = event.detail.value;
    }
     
    if(selectedCountryId == undefined){
      return;
    }
    this.departments = [];
     this.addressForm.controls['stateCode'].setValue('');
    
    this.addressService.findDepartmentsByCountry(selectedCountryId).subscribe(data => {
      this.departments = data
    });

  }

  onDepartmentsSelected(event: any, id:any ) {
    let selectedDepartmentsId :any
    if (!event || !event.detail || !event.detail.value) {
      selectedDepartmentsId= id
    }else{
      selectedDepartmentsId = event.detail.value;
    }
    // console.log('selectedDepartmentsId:', selectedDepartmentsId);
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: false,
})
export class AddressFormComponent {
  @Input() addressForm!: FormGroup; 
  @Input() countries: { value: string; label: string }[] = []; 
  @Input() departments: { value: string; label: string }[] = [];
  @Input() cities: { value: string; label: string }[] = [];
  @Input() propertyType: { value: string; label: string }[] = [];

  @Output() addressSaved = new EventEmitter<any>();

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
}

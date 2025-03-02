import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Injectable({
  providedIn: 'root' // ✅ Asegura que Angular pueda inyectarlo
})
export class ValidationService {
  
  constructor() {}


  hasError(controlContainer: ControlContainer, formControlName: string): boolean {
    if (!controlContainer || !formControlName) return false;

    const control: AbstractControl | null = controlContainer.control?.get(formControlName) ?? null;
    return control?.invalid && control?.touched || false;
  }
}
 
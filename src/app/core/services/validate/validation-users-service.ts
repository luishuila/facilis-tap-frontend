import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationUsersService {
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: 'El nombre es obligatorio.',
      minlength: 'El nombre debe tener al menos 2 caracteres.'
    },
    lastname: {
      required: 'El apellido es obligatorio.',
      minlength: 'El apellido debe tener al menos 2 caracteres.'
    },
    email: {
      required: 'El correo es obligatorio.',
      email: 'Por favor, ingresa un correo válido.'
    },
    password: {
      required: 'La contraseña es obligatoria.',
      minlength: 'La contraseña debe tener al menos 6 caracteres.'
    },
    confirmPassword: {
      required: 'Debes confirmar tu contraseña.',
      minlength: 'La confirmación debe tener al menos 6 caracteres.',
      mismatch: 'Las contraseñas no coinciden.'
    },
    birth: {
      required: 'La fecha de nacimiento es obligatoria.'
    },
    gender: {
      required: 'Selecciona tu género.'
    }
  };


  getErrorMessage(formGroup: FormGroup, fieldName: string): string | null {
    const control: AbstractControl | null = formGroup.get(fieldName);
    if (!control || !control.errors) return null;

    const errors = control.errors;
    for (const errorKey in errors) {
      if (this.validationMessages[fieldName]?.[errorKey]) {
        return this.validationMessages[fieldName][errorKey];
      }
    }
    return null;
  }


  getPasswordMismatchError(formGroup: FormGroup): string | null {
    return formGroup.hasError('mismatch') ? this.validationMessages['confirmPassword']['mismatch'] : null;
  }
  
}

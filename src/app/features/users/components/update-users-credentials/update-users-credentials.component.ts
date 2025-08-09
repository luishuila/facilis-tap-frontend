import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationUsersService } from 'src/app/core/services/validate/validation-users-service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-update-users-credentials',
  templateUrl: './update-users-credentials.component.html',
  styleUrls: ['./update-users-credentials.component.scss'],
  standalone: false,
})
export class UpdateUsersCredentialsComponent implements OnInit {
  credentialsForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public validationUsersService: ValidationUsersService
  ) {
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: matchPasswords('password', 'confirmPassword') });
  }

  ngOnInit() {}

  // passwordsMatchValidator(group: FormGroup) {
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // }

  updateCredentials() {
    if (this.credentialsForm.valid) {
      console.log('Usuario:', this.credentialsForm.value.username);
      console.log('Nueva Contraseña:', this.credentialsForm.value.password);
      // Aquí puedes enviar los datos a la API
    } else {
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
    }
  }
}
export function matchPasswords(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPassword = formGroup.get(confirmPasswordField)?.value;

    if (password !== confirmPassword) {
      formGroup.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      formGroup.get(confirmPasswordField)?.setErrors(null);
      return null;
    }
  };
}
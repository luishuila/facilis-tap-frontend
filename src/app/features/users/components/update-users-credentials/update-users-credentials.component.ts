import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationUsersService } from 'src/app/core/services/validate/validation-users-service';

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
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {}

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

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

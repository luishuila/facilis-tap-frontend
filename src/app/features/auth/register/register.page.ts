import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup; 
  errorMessage: string = '';

  validationMessages: { [key: string]: { [key: string]: string } } = {
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
    birth: {
      required: 'La fecha de nacimiento es obligatoria.'
    },
    gender: {
      required: 'Selecciona tu género.'
    }
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birth: ['', Validators.required] ,
      gender: ['', Validators.required] 
    }, { validator: this.passwordMatchValidator } );
  }
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  ngOnInit() {}

  onRegister() {
    if (this.registerForm.valid) {
      console.log('User Registered:', this.registerForm.value);
      this.router.navigate(['/auth/login']);
    } else {
      this.errorMessage = "Please complete all fields correctly.";
    }
  }
}
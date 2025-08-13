import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User/User';
import { ValidationUsersService } from 'src/app/core/services/validate/validation-users-service';
import { AuthService } from 'src/app/core/services/auth.service';
import { genderObject } from 'src/app/core/constant/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;                 // 👈 quité @Input()
  errorMessage = '';
  genderOptions = genderObject;
  submitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public validationUsersService: ValidationUsersService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      birth: [''],
      gender: ['']
    }, { validators: this.passwordMatchValidator });
  }

  // Validador de confirmación de contraseña a nivel de grupo
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm  = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  goToLogin() {
    // emite evento o navega, como prefieras
    this.router.navigate(['/login']);
  }

  submitRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.registerForm.updateValueAndValidity({ emitEvent: false });
      return; // ❌ no envíes si es inválido
    }

    const newUser = new User(this.registerForm.getRawValue());

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error?.message ?? 'Error al registrar.';
      }
    });
  }

  // Helpers para mostrar errores en plantilla (opcional)
  hasError(ctrl: string, error?: string) {
    const c = this.registerForm.get(ctrl);
    if (!c) return false;
    const touched = c.touched || this.submitted;
    return error ? !!(touched && c.errors?.[error]) : !!(touched && c.invalid);
  }
}

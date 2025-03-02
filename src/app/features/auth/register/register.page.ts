import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User/User';
import { ValidationUsersService } from '../../../core/services/validate/validation-users-service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup; 
  errorMessage: string = '';



  constructor( private authService: AuthService,private fb: FormBuilder, private router: Router,public validationUsersService: ValidationUsersService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach((datos:any)=>{
       datos.markAsTouched();
      })
      return ;
    }
    const newUser = new User(this.registerForm.value);
    console.log(newUser.toJson())

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });

  }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  @Input()loginForm!: FormGroup;
  errorMessage: string = '';
  @Output() eventLogin = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      users: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const { users, password } = this.loginForm.value;

    this.authService.login(users, password).subscribe(response => {
      if (response) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }

  forgotPassword(event:any): void {
    this.eventLogin.emit(event)
    console.log('Recuperar contraseña');
  }

  register(event:any): void {
    this.eventLogin.emit(event)
    console.log('Registro');
  }
}

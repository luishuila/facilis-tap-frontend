import { Component, OnInit } from '@angular/core';
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
  loginForm!: FormGroup; 
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
   private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm(); 
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
   
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa los campos correctamente';
      return;
    }
    alert('Hola mund')
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(response => {
      alert(response)
      if (response) {
        alert('Si paso')
        this.router.navigate(['/']); 
      } else {
        this.errorMessage = `Credenciales incorrectas2 ${response} `;
      }
    });
  }
}

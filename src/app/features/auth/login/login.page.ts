import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/user/users.service';

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
  ) {
 
  }

  ngOnInit() {
    this.initForm(); 
  }

  initForm() {
    this.loginForm = this.fb.group({
      users: [''],
      password: ['']
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((datos:any)=>{
       datos.markAsTouched();
      })
      return ;
    }
    
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(response => {
      if (response) {
        this.router.navigate(['/']); 
      } else {
        this.errorMessage = `Credenciales incorrectas`;
      }
    });
  }
}

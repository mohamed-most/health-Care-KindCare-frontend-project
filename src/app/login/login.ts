import { CommonModule } from '@angular/common'; // 1. Import it here
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  statusMessage = '';
  isSuccess = signal<boolean | null>(null);

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  onLoginFormSubmit(loginForm: any) {
    this.email = loginForm.value.email;
    this.password = loginForm.value.password;

    this.apiService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('user_id', response.data.id);
          localStorage.setItem('user_role', response.data.roles);
          localStorage.setItem('isLoggedIn', 'true');
          this.statusMessage = 'Login successful';
          this.isSuccess.set(true); // Set isSuccess to true;
          if (response.data.roles === 'patient') this.router.navigate(['profile']);
          else if (response.data.roles === 'doctor') this.router.navigate(['doctor-profile']);
          else this.router.navigate(['/']);
        } else {
          this.statusMessage = 'Login failed';
          this.isSuccess.set(false);
        }
      },
      error: (error) => {
        this.statusMessage = 'Login failed';
        this.isSuccess.set(false); // Set isSuccess to false;
        console.error(error);
      },
    });
  }
}

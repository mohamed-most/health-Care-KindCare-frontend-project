import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-reg',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './patient-reg.html',
  styleUrl: './patient-reg.css',
})
export class PatientReg {
  RegistrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  succeeded = signal<boolean | null>(null);
  error: String = '';
  success: String = '';
  statusCode?: number;
  message?: string;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  onSubmitForm(event: Event) {
    event.preventDefault();
    if (this.RegistrationForm.invalid) return;

    const formData = this.RegistrationForm.value;

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.message = 'Registration successful.';
        this.succeeded.set(true); // 1. Set the state to true
        this.hideMessage(); // 2. Start the 30s countdown

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.error = error.error?.message || 'Server error';
        this.message = 'Registration failed.';
        this.succeeded.set(false); // 1. Set the state to false
        this.hideMessage(); // 2. Start the 30s countdown
      },
    });
  }

  hideMessage() {
    setTimeout(() => {
      console.log('Hiding message');
      this.succeeded.set(null); // After 30s, setting to null hides both boxes
    }, 5000);
  }
}

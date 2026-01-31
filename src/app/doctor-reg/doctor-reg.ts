import { Component, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-reg.html',
  styleUrl: './doctor-reg.css',
})
export class DoctorReg implements OnDestroy {
  specializations = signal([]);

  doctorForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    licenseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z]{3}-[0-9]{6}'),
    ]),
    specialization: new FormControl('', [Validators.required]),
  });

  succeeded: boolean | null = null;
  message: string = '';
  private messageTimeout: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllSpecializations();
  }

  onSubmitForm(event: Event) {
    event.preventDefault();

    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      this.showStatus(false, 'Please correct the highlighted errors.');
      return;
    }

    const formData = { ...this.doctorForm.getRawValue(), roles: ['DOCTOR'] };

    if (formData.specialization) {
      formData.specialization = formData.specialization.toUpperCase();
    }
    this.apiService.register(formData).subscribe({
      next: (response) => {
        this.showStatus(true, 'Registration successful! Welcome to the portal.');
        // After successful registration, navigate to the login page
        this.doctorForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.showStatus(false, error.error?.message || 'Registration failed. Please try again.');
      },
    });
  }

  private showStatus(isSuccess: boolean, msg: string) {
    this.succeeded = isSuccess;
    this.message = msg;

    if (this.messageTimeout) clearTimeout(this.messageTimeout);

    // Set for exactly 20 seconds
    this.messageTimeout = setTimeout(() => {
      this.succeeded = null;
      this.message = '';
      this.messageTimeout = null;
      this.doctorForm.reset();
      this.router.navigate(['/login']);
    }, 3000);
  }

  getAllSpecializations() {
    this.apiService.getSpecializations().subscribe({
      next: (response) => {
        console.log(response.data);
        this.specializations.set(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy() {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }
}

import { Component, signal } from '@angular/core';
import { AuthService } from '../auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  isPatientButtonClicked = signal(false);
  isDoctorButtonClicked = signal(false);
  isAppointmentsButtonClicked = signal(false);

  patients = signal([] as any[]);
  doctors = signal([] as any[]);
  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log(this.doctors());
    this.getAllPatients();
    this.getAllDoctors();
  }
  getAllPatients() {
    console.log('getAllPatients');
    this.authService.getAllPatients().subscribe({
      next: (response) => {
        console.log(response);
        this.patients.set(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllDoctors() {
    console.log('getAllDoctors');
    this.authService.getAllDoctors().subscribe({
      next: (response) => {
        this.doctors.set(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handlePatientClick() {
    this.isPatientButtonClicked.set(!this.isPatientButtonClicked());
    this.isDoctorButtonClicked.set(false);
    this.isAppointmentsButtonClicked.set(false);
  }

  handleDoctorClick() {
    this.isPatientButtonClicked.set(false);
    this.isDoctorButtonClicked.set(!this.isDoctorButtonClicked());
    this.isAppointmentsButtonClicked.set(false);
  }
}

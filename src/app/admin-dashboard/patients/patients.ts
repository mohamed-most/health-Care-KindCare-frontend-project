import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api-service';
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients.html',
})
export class Patients implements OnInit {
  private apiService = inject(ApiService);

  // Signal to store patient data
  patients = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.apiService.getAllPatients().subscribe({
      next: (res) => {
        this.patients.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.isLoading.set(false);
      },
    });
  }
}

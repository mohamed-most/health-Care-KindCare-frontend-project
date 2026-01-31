import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ApiService } from '../../api-service';
import { signal } from '@angular/core';
@Component({
  selector: 'app-doctors',
  imports: [],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {
  private apiService = inject(ApiService);

  doctors = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.apiService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctors.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading.set(false);
      },
    });
  }
}

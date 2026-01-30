import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { DatePipe, NgClass } from '@angular/common';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-appointments',
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './my-appointments.html',
  styleUrl: './my-appointments.css',
})
export class MyAppointments {
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  myAppointments = signal<any[]>([]);
  ngOnInit() {
    this.getMyAppointments();
  }
  getMyAppointments() {
    this.apiService.getMyAppointments().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.myAppointments.set(res.data);
          console.log(this.myAppointments());
        }
      },
      error: (err) => console.log(err),
    });
  }

  onCancel(id: number) {
    console.log(id);
    this.apiService.cancelAppointment(id).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.getMyAppointments();
        }
      },
      error: (err) => console.log(err),
    });
  }

  removeFromView(id: number) {
    this.myAppointments.update((appointments) => appointments.filter((a) => a.id !== id));
  }
}

import { Component, signal, OnInit } from '@angular/core';
import { ApiService } from '../api-service';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  // Navigation View States
  isPatientButtonClicked = signal(false);
  isDoctorButtonClicked = signal(false);
  isFaqButtonClicked = signal(false);

  // Data Stores
  patients = signal<any[]>([]);
  doctors = signal<any[]>([]);
  faqs = signal<any[]>([]);

  // Form State
  newFaq = signal({ question: '', answer: '' });

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllPatients();
    this.getAllDoctors();
    this.getAllFaqs();
  }

  // --- Data Fetching ---
  getAllPatients() {
    this.apiService.getAllPatients().subscribe({
      next: (res) => this.patients.set(res.data),
      error: (err) => console.error('Patient load failed', err),
    });
  }

  getAllDoctors() {
    this.apiService.getAllDoctors().subscribe({
      next: (res) => this.doctors.set(res.data),
      error: (err) => console.error('Doctor load failed', err),
    });
  }

  getAllFaqs() {
    this.apiService.getAllFaq().subscribe({
      next: (res) => this.faqs.set(res.data),
      error: (err) => console.error('FAQ load failed', err),
    });
  }

  // --- Actions ---
  addFaq() {
    if (!this.newFaq().question || !this.newFaq().answer) return;

    this.apiService.addFaq(this.newFaq()).subscribe({
      next: () => {
        this.getAllFaqs(); // Refresh list
        this.newFaq.set({ question: '', answer: '' }); // Clear form
      },
      error: (err) => console.error('Add FAQ failed', err),
    });
  }

  // --- Navigation Handlers ---
  handlePatientClick() {
    this.resetViews();
    this.isPatientButtonClicked.set(true);
  }

  handleDoctorClick() {
    this.resetViews();
    this.isDoctorButtonClicked.set(true);
  }

  handleFaqClick() {
    this.resetViews();
    this.isFaqButtonClicked.set(true);
  }

  private resetViews() {
    this.isPatientButtonClicked.set(false);
    this.isDoctorButtonClicked.set(false);
    this.isFaqButtonClicked.set(false);
  }
}

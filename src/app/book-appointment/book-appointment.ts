import { Component, signal, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointment implements OnInit {
  private apiService = inject(ApiService);

  // Status Signals
  message = signal('');
  isError = signal(false);
  isLoading = signal(false);

  // Dropdown States
  isOpenedSpec = signal(false);
  selectedSpec = signal('Select specialization');
  specializations = signal<any[]>([]);

  isOpenedDoc = signal(false);
  selectedDoctor = signal('Select doctor');
  doctors = signal<any[]>([]);

  // Form Initialization
  bookAppointmentForm = new FormGroup({
    doctorId: new FormControl(-1, [Validators.required]),
    purposeOfConsultation: new FormControl('', [Validators.required]),
    initialSymptoms: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.getSpecializations();
  }

  toggleDropdownSpec() {
    this.isOpenedDoc.set(false);
    this.isOpenedSpec.update((v) => !v);
  }

  toggleDropdownDoc() {
    this.isOpenedSpec.set(false);
    this.isOpenedDoc.update((v) => !v);
  }

  // When a specialization is picked
  selectOption(spec: any) {
    const specName = typeof spec === 'string' ? spec : spec.name;

    this.selectedSpec.set(specName);
    this.isOpenedSpec.set(false);

    // Reset doctor selection when specialization changes
    this.selectedDoctor.set('Select doctor');
    this.bookAppointmentForm.patchValue({ doctorId: -1 });

    this.apiService.getDoctorsBySpec(specName).subscribe({
      next: (res) => this.doctors.set(res.data || []),
      error: (err) => console.error('Error fetching doctors:', err),
    });
  }

  // When a doctor is picked
  selectOptionDoc(doc: any) {
    this.bookAppointmentForm.patchValue({ doctorId: Number(doc.id) });
    this.selectedDoctor.set(`Dr. ${doc.user.fullName}`);
    this.isOpenedDoc.set(false);
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    if (this.bookAppointmentForm.invalid) return;

    console.log(this.bookAppointmentForm.value);
    this.isLoading.set(true);

    // Prepare data (Ensuring date format is ISO compatible)
    const formData = { ...this.bookAppointmentForm.value };
    console.log(formData.doctorId);

    this.apiService.bookAppointment(formData).subscribe({
      next: (response) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          this.isError.set(false);
          this.message.set('Appointment Booked Successfully! ✨');
          this.resetForm();
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isError.set(true);
        this.message.set(error.error?.message || 'Failed to book appointment');
        this.isLoading.set(false);
      },
    });
  }

  resetForm() {
    this.bookAppointmentForm.reset();
    this.selectedDoctor.set('Select doctor');
    this.selectedSpec.set('Select specialization');
    this.doctors.set([]);

    // Clear message after 3 seconds
    setTimeout(() => this.message.set(''), 3000);
  }

  getSpecializations() {
    this.apiService.getSpecializations().subscribe({
      next: (response) => this.specializations.set(response.data || []),
      error: (err) => console.error('Error loading specs:', err),
    });
  }
}

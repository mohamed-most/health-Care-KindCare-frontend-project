import { Component, signal } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormControlName,
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
export class BookAppointment {
  constructor(private apiService: ApiService) {}

  message = signal('');
  isError = signal(false);
  // Specialization State
  isOpenedSpec = signal(false);
  selectedSpec = signal('Select specialization');
  specializations = ['Cardiology', 'Dermatology', 'Orthopedics'];

  // Doctor State
  isOpenedDoc = signal(false);
  selectedDoctor = signal('Select doctor');
  doctors = signal([] as any[]);
  currentDocId = signal(-1);

  //form
  bookAppointmentForm = new FormGroup({
    doctorId: new FormControl('', [Validators.required]),
    purposeOfConsultation: new FormControl('', [Validators.required]),
    initialSymptoms: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
  });
  toggleDropdownSpec() {
    this.isOpenedDoc.set(false); // Close other if open
    this.isOpenedSpec.update((v) => !v);
  }

  toggleDropdownDoc() {
    this.isOpenedSpec.set(false); // Close other if open
    this.isOpenedDoc.update((v) => !v);
  }

  selectOption(option: string) {
    this.apiService.getDoctorsBySpec(option).subscribe((res) => {
      console.log(res);
      this.doctors.set(res.data);
    });
    this.selectedSpec.set(option);
    this.isOpenedSpec.set(false);
    this.selectedDoctor.set('Select doctor');
  }

  selectOptionDoc(doc: any) {
    console.log(doc);
    this.bookAppointmentForm.patchValue({ doctorId: doc.user.id });
    this.selectedDoctor.set('DR. ' + doc.user.fullName);
    this.isOpenedDoc.set(false);
  }

  //submit
  onSubmitForm(event: Event) {
    event.preventDefault();
    if (this.bookAppointmentForm.invalid) return;
    this.apiService.bookAppointment(this.bookAppointmentForm.value).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.message.set('Appointment Booked Successfully');
          this.resetForm();
        }
      },
      error: (error) => {
        console.log(error);
        this.isError.set(true);
        this.message.set(error.error.message);
        this.resetForm();
      },
    });
  }

  resetForm() {
    this.bookAppointmentForm.reset();
    this.selectedDoctor.set('Select doctor');
    this.selectOption('Select specialization');
    setTimeout(() => {
      this.message.set('');
    }, 2000);
  }
}

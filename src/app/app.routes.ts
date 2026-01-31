import { Routes } from '@angular/router';
import { Login } from './login/login';
import { DoctorReg } from './doctor-reg/doctor-reg';
import { PatientReg } from './patient-reg/patient-reg';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { Profile } from './profile/profile';
import { BookAppointment } from './book-appointment/book-appointment';
import { MyAppointments } from './my-appointments/my-appointments';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Faq } from './faq/faq';

// Import your guards
import { authGuard, patientOnlyGuard, doctorOnlyGuard } from './api-guard.guard';
import { DoctorProfile } from './doctor/doctor-profile/doctor-profile';
import { Patients } from './admin-dashboard/patients/patients';
import { Doctors } from './admin-dashboard/doctors/doctors';
import { Faqs } from './admin-dashboard/faqs/faqs';
import { Specializations } from './admin-dashboard/specializations/specializations';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login - KindCare',
  },
  {
    path: 'doctorRegister',
    component: DoctorReg,
    title: 'Doctor Registration',
  },
  {
    path: 'patientRegister',
    component: PatientReg,
    title: 'Patient Registration',
  },
  {
    path: '',
    component: Home,
    title: 'KindCare Home',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'My Profile',
    // Anyone logged in can see a profile
    canActivate: [authGuard],
  },
  {
    path: 'book-appointment',
    component: BookAppointment,
    title: 'Book Appointment',
    // Only patients should book appointments
    canActivate: [patientOnlyGuard],
  },
  {
    path: 'my-appointments',
    component: MyAppointments,
    title: 'My Appointments',
    // Both patients and doctors might need to see appointments
    canActivate: [authGuard],
  },
  // {
  //   path: 'admin-dashboard',
  //   component: AdminDashboard,
  //   title: 'Admin Dashboard',
  //   // You should create an adminOnlyGuard similar to the others
  //   // For now, let's assume doctors/admins use a high-level guard
  //   canActivate: [authGuard],
  // },
  {
    path: 'admin',
    component: AdminDashboard, // The sidebar layout
    canActivate: [authGuard],
    children: [
      { path: 'patients', component: Patients },
      { path: 'doctors', component: Doctors }, // Create this next
      { path: 'faqs', component: Faqs }, // Create this next
      { path: 'specializations', component: Specializations },
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
  {
    path: 'faq',
    component: Faq,
    title: 'FAQ - KindCare',
  },
  {
    path: 'doctor-profile',
    component: DoctorProfile,
    title: 'Doctor Profile',
  },
  {
    path: '**',
    component: NotFound,
    title: 'Page Not Found',
  },
];

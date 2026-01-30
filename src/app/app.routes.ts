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
export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'login page',
  },
  {
    path: 'doctorRegister',
    component: DoctorReg,
    title: 'doctor register page',
  },
  {
    path: 'patientRegister',
    component: PatientReg,
    title: 'patient register page',
  },
  {
    path: '',
    component: Home,
    title: 'home page',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'profile page',
  },
  {
    path: 'book-appointment',
    component: BookAppointment,
    title: 'book appointment page',
  },
  {
    path: 'my-appointments',
    component: MyAppointments,
    title: 'my appointments page',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    title: 'admin dashboard page',
  },
  {
    path: 'faq',
    component: Faq,
    title: 'faq page',
  },
  {
    path: '**',
    component: NotFound,
    title: 'not found page',
  },
];

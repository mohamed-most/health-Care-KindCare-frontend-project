import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Nav } from './nav/nav';
import { Footer } from './footer/footer';
import { DoctorReg } from './doctor-reg/doctor-reg';
import { PatientReg } from './patient-reg/patient-reg';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}

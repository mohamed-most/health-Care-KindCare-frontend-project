import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorRegisterRequest } from './model/DoctorRegisterRequest';
import { ApiResponse } from './model/ApiResponse';
import { RegisterResponse } from './model/RegisterResponse';
import { Observable } from 'rxjs';
import LoginResponse from './model/LoginResponse';
import { jwtDecode } from 'jwt-decode';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_BASE_URL = 'http://localhost:8081/api/v1';

  // The global state
  isLoggedIn = signal<boolean>(localStorage.getItem('token') !== null);
  userRole = signal<string | null>(localStorage.getItem('user_role'));

  constructor(private http: HttpClient) {}

  // ########################################################
  // Auth api
  public register(body: any): Observable<any> {
    return this.http.post<ApiResponse<RegisterResponse>>(
      `${this.API_BASE_URL}/auth/register`,
      body,
    );
  }

  public login(body: any): Observable<any> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_BASE_URL}/auth/login`, body);
  }

  public logout() {
    localStorage.clear();
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('user_role');
    return userRole === role;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  isDoctor(): boolean {
    return this.hasRole('DOCTOR');
  }

  isPatient(): boolean {
    return this.hasRole('PATIENT');
  }
  // ################################################################

  // Admin api

  // get all patients
  public getAllPatients(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/patients`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  //########################################################
  //            ####Doctor api####

  // get all doctors
  public getAllDoctors(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/doctors`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  //get Doctor By Spec
  public getDoctorsBySpec(spec: string): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/doctors?spec=${spec.toUpperCase()}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  public getCurrentDoctorData(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/doctors/me`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  //########################################################

  // GET All FAQ
  public getAllFaq(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/faq`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  // POST FAQ
  public addFaq(body: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/faq`, body, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  // DELETE FAQ
  public deleteFaq(id: number): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/faq/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  // ########################################################
  //            ####appointment api####

  // book appointment
  public bookAppointment(body: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/appointments`, body, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }
  public getMyAppointments(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/appointments`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  public cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.put(
      `${this.API_BASE_URL}/appointments/cancel/${appointmentId}`,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
      },
    );
  }

  // ! doctor feature
  public completeAppointment(appointmentId: number): Observable<any> {
    return this.http.put(
      `${this.API_BASE_URL}/appointments/complete/${appointmentId}`,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
      },
    );
  }

  // #########################Uplaod image######################
  public uploadImage(file: File): Observable<any> {
    const body = new FormData();
    body.append('file', file);
    return this.http.put(`${this.API_BASE_URL}/users/profile-picture`, body, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }
  public getCurrentUserData(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/users/me`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
    });
  }

  //###################### MetaData #######################
  public getSpecializations(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/metadata/specializations`);
  }
}

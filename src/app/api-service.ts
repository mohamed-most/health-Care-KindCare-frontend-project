import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorRegisterRequest } from './model/DoctorRegisterRequest';
import { ApiResponse } from './model/ApiResponse';
import { RegisterResponse } from './model/RegisterResponse';
import { Observable } from 'rxjs';
import LoginResponse from './model/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_BASE_URL = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('isLoggedIn');
  }

  // ########################################################

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
}

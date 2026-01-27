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
export class AuthService {
  private API_BASE_URL = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('user_id');
    localStorage.removeItem('isLoggedIn');
  }
}

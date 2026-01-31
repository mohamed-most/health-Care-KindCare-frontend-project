import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api-service';

// Modern Functional Guard for Patients
export const patientOnlyGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  console.log(apiService.isPatient());
  console.log(apiService.isAuthenticated());

  if (apiService.isAuthenticated() && apiService.isPatient()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// Modern Functional Guard for Doctors
export const doctorOnlyGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (apiService.isAuthenticated() && apiService.isDoctor()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// Modern Functional Guard for General Auth
export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (apiService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

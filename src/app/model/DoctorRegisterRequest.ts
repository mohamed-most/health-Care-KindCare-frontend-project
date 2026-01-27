export class DoctorRegisterRequest {
  name?: string;
  email?: string;
  password?: string;
  roles?: string[];
  specialization?: string;
  licenseNumber?: string;
}

/*
   //Example JSON
   "name": "Dr. John Smith",
    "email": "john.smith1234@clinic.com",
    "password": "SecurePassword123!",
    "roles": [
        "DOCTOR",
        "PATIENT"
    ],
    "specialization": "CARDIOLOGY",
    "licenseNumber": "MED-998877"
*/

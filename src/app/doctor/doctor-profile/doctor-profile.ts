import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ApiService } from '../../api-service';
@Component({
  selector: 'app-doctor-profile',
  imports: [],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile {
  profilePicture = signal<string | null>(null);
  doctorData = signal<any>(null);
  isUploading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // 1. Instant load from cache
    const cachedPhoto = localStorage.getItem('user_photo');
    if (cachedPhoto) this.profilePicture.set(cachedPhoto);

    // 2. Load "Truth" from Backend
    this.getDoctorData();
  }

  getDoctorData() {
    this.apiService.getCurrentDoctorData().subscribe({
      next: (res) => {
        this.doctorData.set(res.data);
        if (res.data.user.profilePictureUrl) {
          this.profilePicture.set(res.data.user.profilePictureUrl);
          localStorage.setItem('user_photo', res.data.user.profilePictureUrl);
        }
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Show preview instantly
      const reader = new FileReader();
      reader.onload = () => this.profilePicture.set(reader.result as string);
      reader.readAsDataURL(file);

      // Start actual upload
      this.isUploading.set(true);
      this.apiService.uploadImage(file).subscribe({
        next: (res) => {
          this.profilePicture.set(res.data);
          localStorage.setItem('user_photo', res.data);
          this.isUploading.set(false);
        },
        error: () => {
          this.isUploading.set(false);
          alert('Upload failed!');
        },
      });
    }
  }
}

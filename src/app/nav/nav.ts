import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  constructor(private authService: AuthService) {}
  handleLogOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.isLoggedIn.set(false);
  }
}

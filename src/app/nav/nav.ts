import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  userRole = signal<string | null>(localStorage.getItem('user_role'));
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  handleLogOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}

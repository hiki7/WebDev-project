// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user'; // Ensure you import the User model

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('Login successful', user);
        this.router.navigate(['/books']); // Adjust this as needed to redirect user to the desired route after login
      },
      error: (error) => {
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page or any other appropriate page
    console.log('Logout successful');
  }
}

// src/app/components/registration/registration.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username = '';
  email = '';
  password = '';
  error: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  onRegister(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // Redirect to login page or dashboard
      },
      error: (error) => {
        this.error = error.message; // Display the actual error message from the server
        console.error('Registration error:', error);
      }
    });
  }  
}

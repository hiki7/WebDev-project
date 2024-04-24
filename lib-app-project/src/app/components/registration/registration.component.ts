// src/app/components/registration/registration.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user'; // Ensure you import the User model

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
    // Construct user object
    const newUser: User = {
      name: this.username,
      secondName: '', // Assume you have a mechanism or additional field to capture this if needed
      email: this.email,
      password: this.password,
      isManager: false // Assume a default value or provide a mechanism to set this
    };
    
    this.authService.register(newUser).subscribe({
      next: (user) => {
        console.log('Registration successful', user);
        this.router.navigate(['/books']); // Redirect to books page or any other appropriate route after registration
      },
      error: (error) => {
        this.error = 'Registration failed. ' + (error.error.message || 'Please try again later.');
        console.error('Registration error:', error);
      }
    });
  }
}

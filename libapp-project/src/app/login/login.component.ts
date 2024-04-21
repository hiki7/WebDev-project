// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigateByUrl('/books'); // Redirect to book list after login
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}

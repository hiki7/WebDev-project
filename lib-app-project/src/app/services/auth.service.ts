import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ access: string; refresh: string }>(`${this.apiUrl}api/token/`, { email, password })
      .pipe(
        map(response => this.handleAuthentication(email, '', '', false, password, response.access, response.refresh)),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed, please try again later.'));
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('currentUser') && !!localStorage.getItem('token');
    }
    return false;
  }

  getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  register(user: User): Observable<User> {
    return this.http.post<{ access: string; refresh: string }>(`${this.apiUrl}api/register/`, user)
      .pipe(
        map(response => this.handleAuthentication(user.email, user.name, user.secondName, user.isManager, user.password, response.access, response.refresh)),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.error.message || 'Registration failed, please try again later.'));
        })
      );
  }

  private handleAuthentication(email: string, name: string, secondName: string, isManager: boolean, password: string, accessToken: string, refreshToken: string): User {
    const user: User = { email, name, secondName, isManager, password, token: accessToken };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return user;
  }
}

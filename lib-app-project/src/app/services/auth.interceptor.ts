import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Exclude endpoints that should not have the Authorization header
    if (!(request.url.endsWith('/register') || request.url.endsWith('/token') || request.url.endsWith('/token/refresh'))) {
      const token = this.authService.getToken();
      if (token) {
        // Clone the request to add the new header.
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request);
  }
}

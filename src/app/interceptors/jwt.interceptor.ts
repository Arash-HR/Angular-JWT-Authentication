import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiurl);
    this.authService.authStatus.subscribe((status) => {
      if (status && isApiUrl) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.localStorage.get("access_token")}`
          }
        });
      }
    });

    return next.handle(request);
  }
}

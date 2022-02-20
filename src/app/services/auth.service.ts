import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, BehaviorSubject } from 'rxjs';

import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl: string = "http://localhost:5000";

  public loggedIn = new BehaviorSubject<boolean>(this.jwttoken.isValidToken(this.localStorage.get("access_token") || ''));
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(status: boolean) {
    this.loggedIn.next(status);
  }

  constructor(
    private http: HttpClient,
    private jwttoken: JWTTokenService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    // this.jwttoken.setToken(this.localStorage.get("access_token"));
  }

  isLoggedIn(): boolean {
    this.jwttoken.setToken(this.localStorage.get("access_token"));
    if (this.jwttoken.isTokenExpired()) {
      this.localStorage.remove("access_token");
      return false;
    }
    return true; // if return false then you can't active route
  }

  signIn(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiurl}/auth/login`, data, httpOptions);

  }

  logOut(): void {
    this.localStorage.remove("access_token");
    this.changeAuthStatus(false);
    this.router.navigate(['login']);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/auth/login';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) { }

  signin(data: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiurl}/auth/login`, data, httpOptions);
  }
}

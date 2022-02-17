import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
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

  signin(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiurl}/auth/login`, data, httpOptions);
  }
}

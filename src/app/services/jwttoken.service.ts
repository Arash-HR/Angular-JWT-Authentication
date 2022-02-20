import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken!: string;
  decodedToken!: { [key: string]: string };

  constructor() {
  }

  setToken(token: any) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getExpiryTime(): any {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  // getUser() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.displayname : null;
  // }

  // getEmailId() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.email : null;
  // }


  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime !== null) {
      return ((expiryTime - Math.floor(Date.now() / 1000)) < 0);
    }
    return true;
  }
}
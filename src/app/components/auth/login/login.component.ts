import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = null;
  public loginFormData: User = {
    email: null,
    password: null
  }

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.authService.signin(this.loginFormData).subscribe((data) => (console.log(data)));
    this.authService.signIn(this.loginFormData).subscribe(
      data => { this.handleResponse(data) },
      error => { this.error = error.error.message }
    );
  }

  handleResponse(data: any) {
    this.localStorage.set("access_token", data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }

}

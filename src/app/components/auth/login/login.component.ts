import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/auth/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: Login = {
    email: null,
    password: null
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signin(this.loginForm).subscribe((data) => (console.log(data)));
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "JWT Authentication";
  public loggedIn!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(status => this.loggedIn = status);
  }

  logOut() {
    this.authService.logOut();
  }
}

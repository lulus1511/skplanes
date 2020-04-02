import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private route: Router,
    private toast: MatSnackBar
  ) { }

  login() {
    this.authService.login(this.credentials)
      .then(user => this.route.navigate(['/dashboard']))
      .catch(error => this.toast.open(error.message));
  }

  register() {
    this.authService.register(this.credentials)
      .then(user => this.toast.open('Account created. Please login!', '', { panelClass: 'toast-success' }))
      .catch(error => this.toast.open(error.message));
  }

}

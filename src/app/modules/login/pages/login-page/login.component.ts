import { Component } from '@angular/core';
import 'firebase/auth';
import { AuthService } from "../../../../core/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {

  }
  login() {
    this.authService.googleSignin();

  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { Nullable } from "../../models/helpers/Nullable.interface";
import { LocalUser } from "../../models/interfaces/auth/local-user.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user: Nullable<LocalUser> = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getCurrentUser();

  }
  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("dashboard");
  }

}

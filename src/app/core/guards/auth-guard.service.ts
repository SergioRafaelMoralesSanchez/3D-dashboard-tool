import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }
  canActivate() {
    return this.authService.isAuthorited();
  }

}

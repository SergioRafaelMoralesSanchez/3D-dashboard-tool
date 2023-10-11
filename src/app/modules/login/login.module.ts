import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthService } from "../../core/services/auth.service";
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login-page/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }

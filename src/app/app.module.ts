import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./core/guards/auth-guard.service";
import { SharedModule } from "./shared/components/shared.module";

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        SharedModule], providers: [
        AuthGuard,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

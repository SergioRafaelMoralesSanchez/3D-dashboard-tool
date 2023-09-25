import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home-page/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        FormsModule,
        CommonModule
    ],
    providers: [],
})
export class HomeModule { }

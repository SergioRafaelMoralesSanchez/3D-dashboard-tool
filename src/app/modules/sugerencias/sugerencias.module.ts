import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SugerenciasComponent } from './pages/sugerencias-page/sugerencias.component';
import { SugerenciasService } from "./services/sugerencias.service";
import { SugerenciasRoutingModule } from './sugerencias-routing.module';

@NgModule({
    declarations: [
        SugerenciasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SugerenciasRoutingModule
    ],
    providers: [
        SugerenciasService
    ]
})
export class SugerenciasModule { }

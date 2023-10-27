import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenciasRoutingModule } from './preferencias-routing.module';
import { PreferenciasComponent } from './pages/preferencias-page/preferencias.component';
import { PreferenciasService } from "./services/materiales.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/components/shared.module";
import { MaterialesService } from "../materiales/pages/services/materiales.service";

@NgModule({
    declarations: [
        PreferenciasComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        PreferenciasRoutingModule,
        SharedModule
    ],
    providers: [
        PreferenciasService,
        MaterialesService
    ]
})
export class PreferenciasModule { }

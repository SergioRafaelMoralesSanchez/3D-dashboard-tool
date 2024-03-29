import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EncargoCardComponent } from "../../shared/components/encargo-card/encargo-card.component";
import { MaterialesRoutingModule } from "./materiales-routing.module";
import { MaterialesComponent } from "./pages/materiales-page/materiales.component";
import { MaterialesService } from "./pages/services/materiales.service";
import { NuevoMaterialComponent } from "./components/nuevo-material/nuevo-material.component";
import { SharedModule } from "../../shared/components/shared.module";

@NgModule({
    declarations: [
        MaterialesComponent,
        NuevoMaterialComponent
    ],
    exports: [
        MaterialesComponent,
        NuevoMaterialComponent
    ],
    imports: [
        MaterialesRoutingModule,
        FormsModule,
        CommonModule,
        EncargoCardComponent,
        SharedModule,
        ReactiveFormsModule
    ],
    providers: [
        MaterialesService
    ],
})
export class MaterialesModule { }

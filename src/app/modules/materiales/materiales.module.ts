import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { EncargoCardComponent } from "../../shared/components/encargo-card/encargo-card.component";
import { MaterialesRoutingModule } from "./materiales-routing.module";
import { MaterialesComponent } from "./pages/materiales-page/materiales.component";
import { MaterialesService } from "./pages/services/materiales.service";

@NgModule({
    declarations: [
        MaterialesComponent
    ],
    imports: [
        MaterialesRoutingModule,
        FormsModule,
        CommonModule,
        EncargoCardComponent
    ],
    providers: [
        MaterialesService
    ],
})
export class MaterialesModule { }

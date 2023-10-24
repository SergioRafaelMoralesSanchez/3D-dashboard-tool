import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/components/shared.module";
import { MaterialesModule } from "../materiales/materiales.module";
import { MaterialesService } from "../materiales/pages/services/materiales.service";
import { SimuladorComponent } from './pages/simulador-page/simulador.component';
import { SimuladorRoutingModule } from './simulador-routing.module';
import { EncargosModule } from "../encargos/encargos.module";

@NgModule({
    declarations: [
        SimuladorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SimuladorRoutingModule,
        SharedModule,
        MaterialesModule,
        EncargosModule
    ],
    providers: [
        MaterialesService
    ]
})
export class SimuladorModule { }

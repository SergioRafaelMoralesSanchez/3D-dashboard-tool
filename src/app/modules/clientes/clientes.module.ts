import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from "./pages/clientes-page/clientes.component";
import { SharedModule } from "../../shared/components/shared.module";
import { NuevoClienteComponent } from "./components/nuevo-cliente/nuevo-cliente.component";
import { FormsModule } from "@angular/forms";
import { ClientesService } from "./pages/services/clientes.service";

@NgModule({
    declarations: [
        ClientesComponent,
        NuevoClienteComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ClientesRoutingModule,
        SharedModule
    ],
    providers: [ClientesService]
})
export class ClientesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from "./pages/clientes-page/clientes.component";

@NgModule({
    declarations: [
        ClientesComponent
    ],
    imports: [
        CommonModule,
        ClientesRoutingModule
    ]
})
export class ClientesModule { }

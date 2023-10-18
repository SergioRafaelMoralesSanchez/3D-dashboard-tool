import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from "./pages/clientes-page/clientes.component";

const routes: Routes = [
    { path: '', component: ClientesComponent },
    { path: ':idCliente', component: ClientesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }

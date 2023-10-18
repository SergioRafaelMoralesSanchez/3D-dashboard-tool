import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncargosComponent } from "./pages/encargos-page/encargos.component";
import { EncargoComponent } from "./pages/encargo-page/encargo.component";

const routes: Routes = [
    { path: "", component: EncargosComponent },
    { path: ":id", component: EncargoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EncargosRoutingModule { }

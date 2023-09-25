import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialesComponent } from "./pages/materiales-page/materiales.component";

const routes: Routes = [
    { path: "", component: MaterialesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SugerenciasComponent } from './pages/sugerencias-page/sugerencias.component';

const routes: Routes = [{ path: '', component: SugerenciasComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SugerenciasRoutingModule { }

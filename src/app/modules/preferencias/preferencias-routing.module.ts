import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferenciasComponent } from './pages/preferencias-page/preferencias.component';

const routes: Routes = [{ path: '', component: PreferenciasComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreferenciasRoutingModule { }

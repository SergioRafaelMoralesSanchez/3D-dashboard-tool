import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'materiales',
        loadChildren: () => import('./modules/materiales/materiales.module').then(m => m.MaterialesModule),
    },
    {
        path: 'encargos',
        loadChildren: () => import('./modules/encargos/encargos.module').then(m => m.EncargosModule),
    },
    {
        path: 'clientes',
        loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule)
    },
    { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/guards/auth-guard.service";
const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'materiales',
        loadChildren: () => import('./modules/materiales/materiales.module').then(m => m.MaterialesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'encargos',
        loadChildren: () => import('./modules/encargos/encargos.module').then(m => m.EncargosModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'clientes',
        loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'simulador',
        loadChildren: () => import('./modules/simulador/simulador.module').then(m => m.SimuladorModule)
    },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

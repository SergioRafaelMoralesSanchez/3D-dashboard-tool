import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EncargoComponent } from './pages/encargo/encargo.component';

const routes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "encargo/:id", component: EncargoComponent },
  // { path: "materiales" },
  // { path: "material/:id" },
  // { path: "clientes" },
  // { path: "cliente/:id" },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  // { path: "encargo/:id" },
  // { path: "materiales" },
  // { path: "material/:id" },
  // { path: "cliente" },
  // { path: "cliente/:id" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

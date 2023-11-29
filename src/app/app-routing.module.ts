import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { NotasComponent } from './pages/notas/notas.component';
import { UsersComponent } from './pages/users/users.component';
import { CrearComponent } from './pages/crear/crear.component';
import { EditarComponent } from './pages/editar/editar.component';
import { EliminarComponent } from './pages/eliminar/eliminar.component';

const routes: Routes = [
  {path:"pages/menu", component: MenuComponent},
  {path:"pages/home", component: HomeComponent},
  {path:"pages/notas", component: NotasComponent},
  {path:"pages/users", component: UsersComponent},
  {path:"pages/crear", component: CrearComponent},
  {path:"pages/editar", component: EditarComponent},
  {path:"pages/eliminar", component: EliminarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { OpcionesInventarioComponent } from './opciones-inventario/opciones-inventario.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ActualizarInventarioComponent } from './actualizar-inventario/actualizar-inventario.component';
import { VerHistorialComponent } from './ver-historial/ver-historial.component';
import { NgModule } from '@angular/core';
//mis rutas para en el frontend
export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: PaginaPrincipalComponent},
    {path: "menu", component: OpcionesInventarioComponent},
    {path: "eliminar", component: EliminarProductoComponent},
    {path: "agregar", component: AgregarProductoComponent},
    {path: "actualizar", component: ActualizarInventarioComponent},
    {path: "historial", component: VerHistorialComponent}
]
//hace que al navegar a cualquier pagina comience siempre en la parte de arriba de la pagina
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }



import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: PaginaPrincipalComponent}
]



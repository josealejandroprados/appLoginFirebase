import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { ContactoComponent } from './contacto/contacto.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { ActualizaComponent } from './actualiza/actualiza.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {path:'', component:HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'about', component: AboutComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'productos', component: ProductosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'contacto', component:ContactoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'producto/:id', component:ProductoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'ingresar', component: IngresarComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'actualiza/:id', component: ActualizaComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']) )},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

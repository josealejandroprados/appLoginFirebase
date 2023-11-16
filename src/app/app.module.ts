import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { ContactoComponent } from './contacto/contacto.component';
import { DataService } from './data.service';
import { IngresarComponent } from './ingresar/ingresar.component';
import { ActualizaComponent } from './actualiza/actualiza.component';
import { ProductosComponent } from './productos/productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactoComponent,
    IngresarComponent,
    ActualizaComponent,
    ProductosComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    provideFirebaseApp(() => initializeApp({"projectId":"applogin-ea989","appId":"1:129157234761:web:9b428cbef957580913ff98","storageBucket":"applogin-ea989.appspot.com","apiKey":"AIzaSyC8KS_ueoWn1i3wuzwlRNXyFNe8zMyjRSY","authDomain":"applogin-ea989.firebaseapp.com","messagingSenderId":"129157234761"})),
    provideAuth(() => getAuth())
  ],
  providers: [CookieService, UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

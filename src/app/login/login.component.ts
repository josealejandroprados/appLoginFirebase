import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private user:UserService,
    private router:Router,
    private cookie:CookieService
  ){}

  ingresar(form:NgForm){
    if(form.valid){
      let email=form.value.email;
      let password=form.value.password;

      this.user.login(email,password)
      .then( response => {
        // console.log(response);
        this.user.getUsuarioActual();
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Error: '+error);
        alert('¡Por favor verifica tu email y contraseña!');
      });
    }
  }

  ingresoConGoogle(){
    this.user.loginWithGoogle()
    .then(response => {
      // console.log(response);
      const credencial = GoogleAuthProvider.credentialFromResult(response);
      const token = credencial?.accessToken;
      this.user.tokenWithGoogle(token);
      this.user.getUsuarioActual();
      this.router.navigate(['/home']);
    })
    .catch(error => {
      console.log('Error: '+error);
      alert('Por favor verifique su email');
    })
  }
}

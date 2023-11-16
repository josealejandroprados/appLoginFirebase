import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token!:string;

  constructor(
    private auth:Auth,
    private cookie:CookieService
  ){}

  register(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  logout(){
    return signOut(this.auth);
  }

  getUsuarioActual(){
    this.auth.currentUser?.getIdToken()
    .then(token => {
      // console.log(token);
      this.cookie.set('token',token);
    })
    .catch(error => {console.log('Error: '+error)});

  }

  getToken(){
    return this.cookie.get('token');
  }

  borrarToken(){
    this.cookie.set('token','');
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  tokenWithGoogle(token:any){
    this.cookie.set('access-token',token);
  }

}

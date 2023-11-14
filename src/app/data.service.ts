import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url='https://applogin-ea989-default-rtdb.firebaseio.com/';

  constructor(
    private http:HttpClient,
    private user:UserService
  ){}
  
  obtenerUsuarios(){
    const token = this.user.getToken();
    console.log(token);

    return this.http.get(`${this.url}/usuarios.json?auth=`+token);
  }

  guardarUsuarios(usuarios:Usuario[]){
    const token = this.user.getToken();
    return this.http.put(`${this.url}/usuarios.json?auth=`+token,usuarios);
  }

  eliminarUsuario(indice:number){
    let URL = `${this.url}/usuarios/`+indice+'.json';
    return this.http.delete(URL);
  }

  modificarUsuario(indice:number, usuario:Usuario){
    const token = this.user.getToken();
    let URL = `${this.url}/usuarios/`+indice+'.json?auth='+token;
    return this.http.put(URL,usuario);
  }

}

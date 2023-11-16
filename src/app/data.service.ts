import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url='https://applogin-ea989-default-rtdb.firebaseio.com/';

  constructor(
    private http:HttpClient,
    private user:UserService
  ){}

  //////////////////////////////////////////////////////////////////////////
  //////////////////// PRODUCTOS  //////////////////////////////////////////

  obtenerProductos(){
    const token = this.user.getToken();
    return this.http.get(`${this.url}/productos.json?auth=`+token);
  }

  guardarProductos(productos:Producto[]){
    const token = this.user.getToken();
    return this.http.put(`${this.url}/productos.json?auth=`+token,productos);
  }

  modificarProducto(indice:number, producto:Producto){
    const token = this.user.getToken();
    let URL = `${this.url}/productos/`+indice+'.json?auth='+token;
    return this.http.put(URL,producto);
  }

}

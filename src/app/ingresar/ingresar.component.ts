import { Component } from '@angular/core';
import { Usuario } from '../usuario.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent {

  users:Usuario[] = [];

  constructor(
    private data:DataService,
    private router:Router
  ){}

  agregar(form:NgForm){
    if(form.valid){

      let usuarioNuevo = new Usuario(form.value.nombre,form.value.apellido,form.value.email,form.value.edad);

      this.data.obtenerUsuarios().subscribe(misUsuarios => {
        if(misUsuarios==null){
          // console.log('No hay registros');
          this.users=[];
          // console.log(this.users);
        }
        else{
          this.users=Object.values(misUsuarios);
          // console.log(this.users);
        }
        
        this.users.push(usuarioNuevo);
        // console.log(this.users);

        this.data.guardarUsuarios(this.users).subscribe({next(response){
          console.log("el usuario se agrego correctamente: " + response)},
          error(error){
            console.log('Error:' + error)}
        });

      });

      setTimeout(()=>{
        this.router.navigate(['/about']);
      },1000);
    }
  }

  iraHome(){
    this.router.navigate(['/about']);
  }

}

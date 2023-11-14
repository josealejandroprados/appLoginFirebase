import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actualiza',
  templateUrl: './actualiza.component.html',
  styleUrls: ['./actualiza.component.css']
})
export class ActualizaComponent implements OnInit{

  users:Usuario[]=[];
  indice!:number;

  nombreActual!:string;
  apellidoActual!:string;
  emailActual!:string;
  edadActual!:number;

  constructor(
    private data:DataService,
    private router:Router,
    private activRout:ActivatedRoute
  ){}

  ngOnInit(){

    this.indice=this.activRout.snapshot.params['id'];
    // console.log(this.indice);

    this.data.obtenerUsuarios().subscribe(misUsuarios => {
      if(misUsuarios==null){
        // console.log('No hay registros');
        this.users=[];
        // console.log(this.users);
      }
      else{
        this.users=Object.values(misUsuarios);
        // console.log(this.users);
        let user = this.users[this.indice];
        // console.log(user);
        this.nombreActual=user.nombre;
        this.apellidoActual=user.apellido;
        this.emailActual=user.email;
        this.edadActual=user.edad;
      }
    });
    
  }

  actualizar(form:NgForm){
    if(form.valid){
      let usuarioNuevo = new Usuario(form.value.nombre,form.value.apellido,form.value.email,form.value.edad);
      // console.log(usuarioNuevo);
      this.data.modificarUsuario(this.indice,usuarioNuevo).subscribe({
        next(response){ console.log('Usuario modificado con exito '+response)},
        error(error){ console.log('Error: '+error)}
      });

      setTimeout(()=>{
        this.router.navigate(['/about']);
      },1000);
    }
    else{
      //formulario no valido
      alert('Por favor complete todos los campos');
    }
  }

  iraHome(){
    this.router.navigate(['/about']);
  }

}

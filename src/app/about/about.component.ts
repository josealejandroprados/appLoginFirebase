import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  users:Usuario[]=[];
  existenciaUsuarios!:boolean;
  indexSeleccionado!:number;

  constructor(
    private data:DataService,
    private router:Router
  ){}

  ngOnInit(){

    this.data.obtenerUsuarios().subscribe(misUsuarios => {
      if(misUsuarios==null){
        console.log('No hay registros');
        this.users=[];
        this.existenciaUsuarios=true;
        // console.log(this.users);
      }
      else{
        this.users=Object.values(misUsuarios);
        this.existenciaUsuarios=false;
        // console.log(this.users);
      }
      // console.log(misUsuarios);
    });
  }

  getID(k:number){
    this.indexSeleccionado=k;
  }

  obtenerRutaActualizar():any{
    if(this.indexSeleccionado!=null){
      //se ha seleccionado un usuario
      return ['/actualiza',this.indexSeleccionado];
    }
  }

  verificarEleccionActualizar(){
    if(this.indexSeleccionado==null){
      //no se ha seleccionado ningun usuario
      alert('Por favor seleccione el elemento a actualizar');
    }
  }
  //////////////////////////////////
  //////////////////////////////////

  verificarEleccionBorrar(){

    if(this.indexSeleccionado==null){
      // this.ruta='/';
      // this.parametroRuta='';
      alert('Por favor seleccione el elemento a eliminar');
      // this.tituloModal='Eliminar Usuario';
      // this.cuerpoModal='Por favor seleccione el usuario a eliminar';
    }
    else{
      var mensaje = confirm("¿Esta seguro que desea eliminar el usuario?");

      //Detectamos si el usuario acepto eliminar el usuario
      if (mensaje){

        this.users.splice(this.indexSeleccionado,1);

        this.data.guardarUsuarios(this.users).subscribe({
          next(response){ console.log('Usuarios guardados correctamente '+response)},
          error(error){ console.log('Error ',+error)}
        });

        setTimeout(() => {this.router.navigate(['/about'])},1000);
      }
    }      

  }

  borrarUsuario(){
    this.users.splice(this.indexSeleccionado,1);

    this.data.guardarUsuarios(this.users).subscribe({
      next(response){ console.log('Usuarios guardados correctamente '+response)},
      error(error){ console.log('Error ',+error)}
    });

    setTimeout(()=>{
      this.router.navigate(['/about']);
    },1000);
  }

}

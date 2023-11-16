import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  product:Producto[]=[];
  existenciaProductos!:boolean;
  indexSeleccionado!:number;

  constructor(
    private data:DataService,
    private router:Router
  ){}

  ngOnInit(){

    this.data.obtenerProductos().subscribe(misProductos => {
      if(misProductos==null){
        console.log('No hay productos');
        this.product=[];
        this.existenciaProductos=true;
      }
      else{
        this.product=Object.values(misProductos);
        this.existenciaProductos=false;
      }
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
      alert('Por favor seleccione el producto a eliminar');
    }
    else{
      var mensaje = confirm("¿Esta seguro que desea eliminar el producto?");

      //Detectamos si el usuario acepto eliminar el producto
      if (mensaje){

        this.product.splice(this.indexSeleccionado,1);

        this.data.guardarProductos(this.product).subscribe({
          next(response){ console.log('Producto eliminado correctamente ')},
          error(error){ console.log('Error ',+error)}
        });

        setTimeout(() => {
          this.router.navigate(['/about']);
          window.location.reload();
        },1000);
      }
    }      

  }

}

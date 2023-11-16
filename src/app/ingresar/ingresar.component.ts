import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent {

  product:Producto[] = [];

  constructor(
    private data:DataService,
    private router:Router
  ){}

  agregar(form:NgForm){
    if(form.valid){

      let productoNuevo = new Producto(form.value.title,form.value.description,form.value.fileName,form.value.price);

      this.data.obtenerProductos().subscribe(misProductos => {
        if(misProductos==null){
          // console.log('No hay registros');
          this.product=[];
        }
        else{
          this.product=Object.values(misProductos);
        }
        
        this.product.push(productoNuevo);

        this.data.guardarProductos(this.product).subscribe({
          next(response){ console.log("el producto se agrego correctamente: ") },
          error(error){ console.log('Error:' + error) }
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

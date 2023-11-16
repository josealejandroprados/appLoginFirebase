import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-actualiza',
  templateUrl: './actualiza.component.html',
  styleUrls: ['./actualiza.component.css']
})
export class ActualizaComponent implements OnInit{

  produc:Producto[]=[];
  indice!:number;

  titleActual!:string;
  descriptionActual!:string;
  fileNameActual!:string;
  priceActual!:number;

  constructor(
    private data:DataService,
    private router:Router,
    private activRout:ActivatedRoute
  ){}

  ngOnInit(){

    this.indice=this.activRout.snapshot.params['id'];
    // console.log(this.indice);

    this.data.obtenerProductos().subscribe(misProductos => {
      if(misProductos==null){
        // console.log('No hay registros');
        this.produc=[];
      }
      else{
        this.produc=Object.values(misProductos);
        let producto = this.produc[this.indice];
        // console.log(user);
        this.titleActual=producto.title;
        this.descriptionActual=producto.description;
        this.fileNameActual=producto.fileName;
        this.priceActual=producto.price;
      }
    });
    
  }

  actualizar(form:NgForm){
    if(form.valid){

      let productoNuevo = new Producto(form.value.title, form.value.description, form.value.fileName, form.value.price);
      
      this.data.modificarProducto(this.indice,productoNuevo).subscribe({
        next(response){ console.log('Producto modificado con exito ')},
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

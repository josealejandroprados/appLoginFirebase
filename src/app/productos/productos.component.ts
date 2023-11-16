import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  product:Producto[]=[];
  // Configuración de la paginación
  currentPage: number = 1;
  itemsPerPage: number = 8; // Número de elementos por página

  constructor(
    private data:DataService
  ){}

  ngOnInit(){
    this.data.obtenerProductos().subscribe(misProductos => {
      if(misProductos==null){
        console.log('No hay productos');
        this.product=[];
      }
      else{
        this.product=Object.values(misProductos);
      }
    });
  }

  ruta(filename:string){
    return './assets/3D/'+filename+'.jpg';
  }

  // Función para cambiar de página
  pageChanged(event: any): void {
    this.currentPage = event.page;
  }

}

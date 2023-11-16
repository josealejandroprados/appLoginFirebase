import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto.model';
import { DataService } from '../data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  indice!:number;
  produc:Producto[]=[];

  titleActual!:string;
  descriptionActual!:string;
  fileNameActual!:string;
  priceActual!:number;

  constructor(
    private activRout:ActivatedRoute,
    private data:DataService,
    private location:Location
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

  ruta(){
    return './assets/3D/'+this.fileNameActual+'.jpg';
  }

}

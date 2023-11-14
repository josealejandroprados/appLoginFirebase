export class Usuario{

    nombre!:string;
    apellido!:string;
    email!:string;
    edad!:number;
    // colorFavorito!:string;

    constructor(nombre:string, apellido:string, email:string, edad:number){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.edad=edad;
        // this.colorFavorito=color;
    }
}
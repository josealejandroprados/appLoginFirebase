export class Producto{

    title!:string;
    description!:string;
    fileName!:string;
    price!:number;

    constructor(title:string, description:string, fileName:string, price:number){
        this.title=title;
        this.description=description;
        this.fileName=fileName;
        this.price=price;
    }
}
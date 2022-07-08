import { Reunion } from "./reunion";

export class Oficina {
    _id!: string;
    nombre!:string;
    reuniones!: Array<Reunion>;
    edificio!: string;
    piso!:number;
    numero!:number;

    constructor(){
        this.reuniones = new Array<Reunion>();
    }
}

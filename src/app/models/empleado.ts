import { Dependencia } from "./dependencia";
import { Notificacion } from "./notificacion";
import { Reunion } from "./reunion";

export class Empleado {
    _id!: string;
    apellido!: string;
    nombre!: string;
    legajo!: string;
    email!: string;
    dependencia!: Dependencia;
    username!: string;
    password !: string;
    rol !:string;
    estadoEmpleado!: boolean;
    reuniones!: Array<Reunion>;
    notificaciones!: Array <Notificacion> ;
    cantidadReuniones!: number;

    constructor(){
        this.dependencia = new Dependencia();
        this.cantidadReuniones = 0;
        this.estadoEmpleado = true;
        this.notificaciones = new Array<Notificacion>();
        this.reuniones = new Array<Reunion>();
    }
}

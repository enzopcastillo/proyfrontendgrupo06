import { Empleado } from "./empleado";
import { Notificacion } from "./notificacion";
import { Oficina } from "./oficina";
import { Recurso } from "./recurso";
import { TipoReunion } from "./tipo-reunion";

export class Reunion {
    _id!: string;
    nombre!:string;
    descripcion!:string;
    fecha!: string;
    horaReunion!: string;
    horaFinalizacion!:string;
    tipoReunion!: TipoReunion;
    estadoReunion!: string;
    oficina!: Oficina;
    participantes!: Array <Empleado>;
    recursos!: Array <Recurso>;
    prioridad!: number;
    codigoQr!:string;
    notificacion!: Array<Notificacion>;

    constructor(){
        this.recursos = new Array<Recurso>();
        this.tipoReunion = new TipoReunion();
        this.notificacion = new Array<Notificacion>();
        this.participantes = new Array<Empleado>();
        this.estadoReunion = "pendiente";
    }
}




import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Notificacion } from 'src/app/models/notificacion';
import { Oficina } from 'src/app/models/oficina';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EnviomailService } from 'src/app/services/enviomail.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-gestion-reuniones',
  templateUrl: './gestion-reuniones.component.html',
  styleUrls: ['./gestion-reuniones.component.css']
})
export class GestionReunionesComponent implements OnInit {

  reuniones!: Array <Reunion>;
  oficinaSelected!: string;
  oficinas!: Array <Oficina>;
  participanteSelected!: string;
  participantes!: Array <Empleado>;
  notificacion!: Notificacion;
  remitentes!: Array<string>;

aux!: Reunion;

   //Mensaje de confirmacion
   @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

   modalData!: {
     nombreReunion: string;
     r: any;
   };

  constructor(private reunionService: ReunionService, private modal: NgbModal, private router: Router, private toastr: ToastrService, private empleadoServ: EmpleadoService, private recursoService: RecursoService,  private envioMail: EnviomailService, private notificacionServ: NotificacionService) { 
    this.notificacion = new Notificacion();
  }

  ngOnInit(): void {
    this.cargarReuniones();
    this.getOficinas();
    this.getParticipantes();
    this.participanteSelected="0";
  }

  cargarReuniones(){
    this.reunionService.getReuniones().subscribe(
      result=>{
        //console.log(result);
        var reunion= new Reunion();
        this.reuniones=new Array <Reunion>();
        result.forEach((element:any) => {
          Object.assign(reunion, element);
          //console.log(reunion);
          this.reuniones.push(reunion);
          reunion= new Reunion();
        });
        //console.log(this.reuniones);
        // this.dtTrigger.next();
      },
      error=>{
      }
    );
  }

  altaReunion(){
    this.router.navigate(['principal/Administrador/gestionReuniones/formReunion', 0]);
  }

  modificarReunion(r: Reunion){
    this.router.navigate(['principal/Administrador/gestionReuniones/formReunion', r._id]);
  }

  borrarReunion(r: Reunion){
    console.log(r);
    var id:string= r._id;
    console.log(r._id);

    this.aux= r;
    

    //Se borra el id de la reunion en cada participante
    r.participantes.forEach((element:any) =>{
      
      var reuniones: Array <any>= new Array<any>();
      reuniones= element.reuniones.filter((item:any)=> item !== r._id);
      console.log(reuniones);
      element.reuniones= reuniones;
      this.modificarParticipante(element);

    });
    
    //Se borra el id de la reunion en la oficina
    r.oficina.reuniones= r.oficina.reuniones.filter((item:any)=> item !== r._id);
    console.log(r.oficina.reuniones);
    this.modificarOficina(r.oficina);

    //Se borran los recursos
    r.recursos.forEach((element:any)=>{
      this.borrarRecurso(element);
    });

    //Se borra la reunion
    this.reunionService.deleteReunion(id).subscribe(
      result=>{
        this.cargarReuniones();
        this.toastr.success('La reunion se ha borrado','Operacion exitosa',{
          extendedTimeOut:3000});
       },
      error=>{
        this.toastr.error('Error');        
      }
    );
    this.modal.dismissAll();
    //Se notifica que la reunion fue suspendida
    if( r.estadoReunion == "pendiente"){
      this.crearNotificacion(this.aux);
      this.enviarMail(this.aux);
    }
  }
  modificarParticipante(empleado: Empleado){
    this.empleadoServ.modificarEmpleado(empleado).subscribe(
      result=>{
        console.log(empleado);
      },
      error=>{
        
      }
    )
  }
  
  modificarOficina(oficina:Oficina){
    this.reunionService.modificarOficina(oficina).subscribe(
      result=>{
        console.log(oficina);
      }
    )
  }
  borrarRecurso(recurso : Recurso){
   this.recursoService.deleteRecurso(recurso).subscribe(
      result => {
        console.log(result);
      }
    )
  }
  enviarMail(reunion: Reunion){
    var asunto = "Reunion suspendida";
    var mensaje = "La reunion '" + reunion.nombre + "' a realizarse en la fecha " + reunion.fecha + ", en la oficina "+ reunion.oficina.nombre + "fue suspendida.";
    console.log(this.remitentes);
    this.remitentes.forEach((element:any)=>{
      this.envioMail.sendMail(element, asunto, mensaje, reunion.codigoQr).subscribe((r)=> {
        console.log("aqui llega");
        console.log(r);
      });
    })
    // for(var i=0 ; i < this.remitentes.length; i++){
    //   this.envioMail.sendMail(this.remitentes[i], asunto, mensaje, reunion.codigoQr).subscribe((r)=> {
    //     console.log("aqui llega");
    //     console.log(r);
    //   });
    // }
  }
  agregarNotificacionEmpleado(reunion: Reunion){
    this.remitentes = new Array<string>();
    this.notificacionServ.getNotificaciones().subscribe((nots) => {
      for(var i=0; i < reunion.participantes.length; i++){
        this.remitentes.push(reunion.participantes[i].email);
        console.log(this.remitentes);
        reunion.participantes[i].notificaciones.push(nots[nots.length - 1]);
        this.modificarParticipante(reunion.participantes[i]);
        console.log("array notificaciones empleado:", reunion.participantes[i].notificaciones);
      }
    });
  }

  crearNotificacion(reunion: Reunion){
    var date = new Date();
    this.notificacion.titulo = reunion.nombre;
    this.notificacion.descripcion = reunion.descripcion;
    this.notificacion.estado = "suspendida";
    this.notificacion.fecha = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.notificacion.fechaVencimiento = reunion.fecha;
    this.notificacionServ.addNotificacion(this.notificacion).subscribe((n) => {
      console.log(n);
      this.notificacion = new Notificacion();
    });
    this.agregarNotificacionEmpleado(reunion);
  }
  verDetalle(r: Reunion){
    this.modal.dismissAll();
    this.router.navigate(['detalle/reunion', r._id]);
  }
  
  busquedaPorOficina(){
    this.reunionService.getReunionesOficina(this.oficinaSelected).subscribe(
      (result)=>{
        this.reuniones = result;
      }
    )
  }

  busquedaPorParticipantes(){
    this.reunionService.getReunionesEmpleado(this.participanteSelected).subscribe(
      (result)=>{
        this.reuniones = result;
      }
    )
  }

  irCalendario(){
    this.router.navigate(['principal/Administrador/calendario']);
  }

  getOficinas(){
    this.oficinas = new Array<Oficina>();
    this.reunionService.getOficinas().subscribe((o) => {
      //this.oficinas = o;
      Object.assign(this.oficinas, o);
    })
  }

  getParticipantes(){
    this.participantes = new Array<Empleado>();
    this.empleadoServ.getEmpleados().subscribe((p) => {
      for(var i=0; i<p.length; i++){
        if(p[i].rol === 'participante'){
          this.participantes.push(p[i]);
        }
      }
    })
  }

  confirmacionBorrar(r: Reunion){
    this.modalData = {
      nombreReunion: r.nombre,
      r: r
    };

    this.modal.open(this.modalContent, { size: 'md' });
  }
}

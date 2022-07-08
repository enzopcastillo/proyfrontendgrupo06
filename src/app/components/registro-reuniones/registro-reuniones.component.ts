import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Notificacion } from 'src/app/models/notificacion';
import { Oficina } from 'src/app/models/oficina';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { TipoReunion } from 'src/app/models/tipo-reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneradorQrService } from 'src/app/services/generador-qr.service';
import { EnviomailService } from 'src/app/services/enviomail.service';
import { ToastrService } from 'ngx-toastr';
import { daysToWeeks } from 'date-fns';

@Component({
  selector: 'app-registro-reuniones',
  templateUrl: './registro-reuniones.component.html',
  styleUrls: ['./registro-reuniones.component.css']
})
export class RegistroReunionesComponent implements OnInit {

  reunion!: Reunion;
  tiposReunion!: Array<TipoReunion>;
  oficinas!: Array<Oficina>;
  participantes!: Array<Empleado>;
  recurso!:Recurso;
  notificacion!: Notificacion;
  remitentes!: Array<string>;
  accion: string = "new";
  minDate: any;
  reunionValida!: boolean;
  colisionOficina!:boolean;

  constructor(private reunionService: ReunionService, private empleadoServ: EmpleadoService,
    private recursoServ: RecursoService, private notificacionServ: NotificacionService,
    private router: Router, private genQR: GeneradorQrService,
    private envioMail: EnviomailService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
    this.reunion = new Reunion();
    this.recurso = new Recurso();
    this.notificacion = new Notificacion();
    this.getParticipantes();
    this.getTipoReunion();
    this.getOficinas();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0"){
        this.accion = "new";
      }else{
        this.accion = "update";
        this.cargarReunion(params['id']);
      }
    });
    this.desabilitarFechaAnteriores();
  }

  /* TIPO DE REUNION */
  getTipoReunion(){
    this.tiposReunion = new Array<TipoReunion>();
    this.reunionService.getTiposReunion().subscribe((tR)=> {
      this.tiposReunion = tR;
    })
  }

  /* OFICINAS */
  getOficinas(){
    this.oficinas = new Array<Oficina>();
    this.reunionService.getOficinas().subscribe((o) => {
      this.oficinas = o;
    })
  }

  /* PARTICIPANTES */
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

  seleccionarParticipante(p: Empleado, $event: MouseEvent){
    ($event.target as HTMLButtonElement).disabled = true;
    this.reunion.participantes.push(p);
  }

  eliminarParticipante(participante: Empleado){
    const par = this.reunion.participantes.filter(p => p._id !== participante._id);
    this.reunion.participantes = par;
  }

  /* RECURSOS */
  cargarRecurso(){
    this.recursoServ.addRecurso(this.recurso).subscribe((r) => {
      this.recurso = new Recurso();
    })
    this.recursoServ.getRecursos().subscribe((rec)=> {
      var recur = new Recurso();
      recur = rec[rec.length - 1];
      this.reunion.recursos.push(recur);
    })
  }

  quitarRecurso(recurso : Recurso){
    const r = this.reunion.recursos.filter(r => r._id !== recurso._id);
    this.reunion.recursos = r;
    this.recursoServ.deleteRecurso(recurso).subscribe(rec => {
      console.log(rec);
    })
  }

  /* CRUD REUNIONES */
  registrarReunion(){
    this.compararHoras();
    if (this.reunionValida == false){
      this.toastr.error('La hora de finalizacion de la reunion tiene que ser mayor que la de inicio');
    } else{
      this.reunionService.addReunion(this.reunion).subscribe((r) => {
        console.log(r);
        //this.reunion = new Reunion();
        this.toastr.success('Reunion creada exitosamente');
      });
      this.crearNotificacion();
      this.buscarReunion();
      this.crearNotificacionReunion();
      var url:string="http://localhost:4200/detalle/reunion/" + this.reunion._id;
      this.generarQR(url);
      console.log("reunion luego de modificar: ", this.reunion);
      this.router.navigate(['principal/Administrador/gestionReuniones']);
    }
  }

  buscarReunion(){
    this.reunionService.getReuniones().subscribe((reu)=>{
      for(var i=0; i < this.reunion.participantes.length; i++){
        this.reunion.participantes[i].reuniones.push(reu[reu.length - 1]);
        this.modificarEmpleado(this.reunion.participantes[i]);
      }
      console.log(this.reunion.oficina);
      this.reunion.oficina.reuniones.push(reu[reu.length - 1]);
      this.reunionService.modificarOficina(this.reunion.oficina).subscribe((of) =>{
      console.log(of);
      });
      this.reunion = reu[reu.length - 1];
    });
  }

  modificarReunion(){
    this.reunionService.modificarReunion(this.reunion).subscribe((r) => {
      console.log(r);
      this.reunion = new Reunion();
      this.reunionService.getReuniones().subscribe((reu)=>{
        this.reunion = reu[reu.length - 1];
        //this.toastr.success('Se ha modificado con exito');
        //this.router.navigate(['principal/Administrador/gestionReuniones']);
      });
    })
  }

  cargarReunion(id: string){
    this.reunion.recursos= [];
    this.reunion.participantes=[];
    this.reunionService.getReunion(id).subscribe(
      result=>{
        this.reunion= new Reunion();
        Object.assign(this.reunion, result);
        this.reunion.tipoReunion= this.tiposReunion.find((item)=>(item._id == this.reunion.tipoReunion._id ))!;
        this.reunion.oficina= this.oficinas.find((item)=>(item._id == this.reunion.oficina._id ))!;
        console.log(this.reunion);
      }
    )
  }

  cargarReunionOficina(){
    this.reunion.oficina.reuniones.push(this.reunion);
    this.reunionService.modificarOficina(this.reunion.oficina).subscribe((of) =>{
      console.log(of);
    });
  }

  cargarReunionEmpleado(){
    for(var i=0; i < this.reunion.participantes.length; i++){
      this.reunion.participantes[i].reuniones.push(this.reunion);
      this.modificarEmpleado(this.reunion.participantes[i]);
    }
  }

  modificarEmpleado(par: Empleado){
    this.empleadoServ.modificarEmpleado(par).subscribe((e)=>{
      console.log(e);
    });
  }

  irDetalle(id: string){
    this.router.navigate(['detalle/reunion', id]);
  }

  /* VALIDACION: colisiones entre oficinas */
  validacionReunion(){
    this.compararHoras();
    if (this.reunionValida == false ){
      console.log('Error en los horarios.')
    }
    this.validarColisionOficina();
  }

  validarColisionOficina(){
    this.colisionOficina=false;
    var reunionesOficina: Array <Reunion>= new Array <Reunion>();
    //Variables para las comparaciones
    var [añoReunion, mesReunion, diaReunion]= this.reunion.fecha.split('-');
    var [horaInicio, minutosInicio]= this.reunion.horaReunion.split(':');
    var [horaFin, minutosFin]= this.reunion.horaFinalizacion.split(':');
    
    //Se traen las reuniones cargadas en la oficina que se asigno a la reunion
    this.reunionService.getReunionesOficina(this.reunion.oficina._id).subscribe(
      result=>{
        Object.assign(reunionesOficina, result);
        if(reunionesOficina.length ==0){
          console.log("Reunion en oficina valida, sin reuniones en oficina");
        }
        else{
          //Por cada reunion en la oficina se comparan los datos
          reunionesOficina.forEach((element:any)=>{
           
            var [añoReunionOficina, mesReunionOficina, diaReunionOficina]= element.fecha.split('-');
             //Se comprueba la fecha de la reunion cargada coicide con la fecha de alguna reunion 
            if(añoReunion == añoReunionOficina && mesReunion == mesReunionOficina && diaReunion == diaReunionOficina){
            
              console.log("Reunion en la oficina el mismo dia");

              //Variables de la reunion de la Oficina
              var [horaInicioAux, minutosInicioAux]= element.horaReunion.split(':');
              var [horaFinAux, minutosFinAux]= element.horaFinalizacion.split(':');
              
              if((horaInicio >= horaInicioAux && minutosInicio >= minutosInicioAux) && (horaFin <= horaFinAux)){
                console.log("Horario reunion ingresada esta dentro del horario de otra reunion");
                this.toastr.error('El horario de la reunion ingresada esta dentro del horario de otra reunion: '+element.nombre, 'Colision oficina');
                this.colisionOficina=true;

              }else{
                if((horaInicio <= horaInicioAux || minutosInicio == minutosInicioAux) && (horaFin >= horaFinAux || minutosFin == minutosFinAux)){
                  console.log("Horario reunion ingresada contiene al horario de otra reunion");
                  this.toastr.error('El horario de la reunion ingresada contiene al horario de otra reunion: '+element.nombre, 'Colision oficina');
                  this.colisionOficina=true;
                }
                else{
                  console.log("Reunion en oficina valida");
                }
              }
            }else{
              console.log("Reunion en oficina valida, no coicide el dia con ninguna reunion");
            }
          });
        }
        if(this.colisionOficina == false){
          this.registrarReunion();
        }
      },
      error=>{}
    );
  }

  /* NOTIFICACIONES */
  agregarNotificacionEmpleado(){
    this.remitentes = new Array<string>();
    this.notificacionServ.getNotificaciones().subscribe((nots) => {
      for(var i=0; i < this.reunion.participantes.length; i++){
        this.remitentes.push(this.reunion.participantes[i].email);
        console.log(this.remitentes);
        this.reunion.participantes[i].notificaciones.push(nots[nots.length - 1]);
        this.modificarEmpleado(this.reunion.participantes[i]);
        console.log("array notificaciones empleado:", this.reunion.participantes[i].notificaciones);
      }
    });
  }

  crearNotificacion(){
    var date = new Date();
    this.notificacion.titulo = this.reunion.nombre;
    this.notificacion.descripcion = this.reunion.descripcion;
    this.notificacion.estado = this.reunion.estadoReunion;
    this.notificacion.fecha = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.notificacion.fechaVencimiento = this.reunion.fecha;
    this.notificacionServ.addNotificacion(this.notificacion).subscribe((n) => {
      console.log(n);
      this.notificacion = new Notificacion();
    });
    this.agregarNotificacionEmpleado();
  }

  crearNotificacionReunion(){
    this.notificacionServ.getNotificaciones().subscribe((nots) => {
      this.notificacion = nots[nots.length - 1];
      console.log(this.notificacion);
      this.reunion.notificacion.push(nots[nots.length - 1]);
    });
  }

  /* QR */
  generarQR(url: string){
    this.genQR.getQr(url).subscribe((qr)=> {
      this.reunion.codigoQr = qr.qr;
      this.modificarReunion();
      this.enviarMail();
      console.log("reunion luego de modificar: ", this.reunion);
      //this.irDetalle(this.reunion._id);
    });
  }

  /* MAIL */
  enviarMail(){
    var asunto = "Nueva Reunion";
    var mensaje = "Se te asigno a la reunion: " + this.reunion.nombre + ". A realizarse: " + this.reunion.fecha;
    console.log(this.remitentes);
    for(var i=0 ; i < this.remitentes.length; i++){
      this.envioMail.sendMail(this.remitentes[i], asunto, mensaje, this.reunion.codigoQr).subscribe((r)=> {
        console.log(r);
      });
    }
  }
  
  //VALIDACION: que no se puedan crear reuniones antes del dia de la fecha
  desabilitarFechaAnteriores(){
    var date: any = new Date();
    var today: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if(today < 10){
      today = '0' + today;
    }
    if(month < 10){
      month = '0' + month;
    }
    this.minDate = year + "-" + month + "-" + today;
  }

  //VALIDACION: que la hora de finalizacion de la reunion sea mayor a la hora de inicio
  compararHoras(){
    this.reunionValida=true;
    if(this.reunion.horaReunion >= this.reunion.horaFinalizacion){
      this.reunionValida = false;
    }
  }
}

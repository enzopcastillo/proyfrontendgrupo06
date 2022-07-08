import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Oficina } from 'src/app/models/oficina';
import { Reunion } from 'src/app/models/reunion';
import { LoginService } from 'src/app/services/login.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-audiencias',
  templateUrl: './audiencias.component.html',
  styleUrls: ['./audiencias.component.css']
})
export class AudienciasComponent implements OnInit {

  reuniones!: Array <Reunion>;
  reunionesAux!: Array <Reunion>;
  oficinaSelected!: string;
  oficinas!:Array <Oficina>;
  mostrar!: boolean;
  idEmpleado!: any;

  constructor(private reunionService: ReunionService, private router: Router, private toastr: ToastrService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarReuniones();
    this.getOficinas();
    this.obtenerId();
    this.cargarReunionesAux();
  }
  
  busquedaPorOficina(){
    this.reunionService.getReunionesOficina(this.oficinaSelected).subscribe(
      (result)=>{
        this.reuniones = result;
      }
    )
  }

  getOficinas(){
    this.oficinas = new Array<Oficina>();
    this.reunionService.getOficinas().subscribe(
      (o) => {
        this.oficinas = o;
      })
  }
  
  cargarReuniones(){
    this.reunionService.getReuniones().subscribe(
      result=>{
        var reunion= new Reunion();
        this.reuniones=new Array <Reunion>();
        result.forEach((element:any) => {
          Object.assign(reunion, element);
          this.reuniones.push(reunion);
          reunion= new Reunion();
        });
        // this.dtTrigger.next();
      },
      error=>{
      }
    );
  }

  cargarReunionesAux(){
    this.reunionService.getReunionesEmpleado(this.idEmpleado).subscribe(
      result=>{
        var reunion= new Reunion();
        this.reunionesAux=new Array <Reunion>();
        result.forEach((element:any) => {
          Object.assign(reunion, element);
          this.reunionesAux.push(reunion);
          reunion= new Reunion();
        });
        // this.dtTrigger.next();
      },
      error=>{
      }
    );
  }

  obtenerId(){
    this.idEmpleado= this.loginService.idLogged();
  }

  verDetalle(r: Reunion){
    let array = this.reunionesAux.filter(element => element._id == r._id);
    if( array.length == 0){
      this.toastr.info('No eres participante', 'Error mostrar detalle');
    }
    else{
       this.router.navigate(['detalle/reunion', r._id]);
    }
  }
}

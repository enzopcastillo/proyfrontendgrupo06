import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReunionService } from 'src/app/services/reunion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css']
})
export class GestionEmpleadosComponent implements OnInit {

  empleados!: Array<Empleado>;
  empleado!: Empleado;

  constructor(private empleadoServ: EmpleadoService,private router: Router, private toastr: ToastrService, private reunionServ: ReunionService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  /* CRUD EMPLEADOS */
  getEmpleados(){
    this.empleados = new Array<Empleado>();
    this.empleadoServ.getEmpleados().subscribe((e) => {
      this.empleados = e;
      for(var i=0; i < e.length; i++){
        const reus = new Array<Reunion>();
        for(var r=0; r < e[i].reuniones.length; r++){
          this.reunionServ.getReunion(e[i].reuniones[r]).subscribe((enc) => {
            var reunion = new Reunion();
            reunion  = enc;
            reus.push(reunion);
          });
        }
        this.empleados[i].reuniones = reus;
      }
    });
  }
  
  altaEmpleado(){
    this.router.navigate(['principal/Administrador/gestionEmpleados/formEmpleado', 0]);
  }

  borrarEmpleado(empleado: Empleado){
    var pend = false;
    var id:string= empleado._id;
    if(empleado.rol!=='administrador'){
      for(var i=0; i < empleado.reuniones.length && pend==false; i++){
        if(empleado.reuniones[i].estadoReunion==='pendiente'){
          pend=true;
        }
      }
      if(pend==true){
        this.toastr.error('No es posible eliminar este empleado ya que tiene reuniones pendientes.');
      }
      else{
        this.empleadoServ.deleteEmpleado(id).subscribe(
          result=>{
              this.getEmpleados();
              this.toastr.success('Operacion exitosa','Exito',{
                extendedTimeOut:3000});
          },
          error=>{
              this.toastr.error('Error');        
          }
         );
      }
    }
    else{
      this.toastr.error('No se pueden eliminar administradores.');
    }
  }

  modificarEmpleado(empleado: Empleado){
    this.router.navigate(['principal/Administrador/gestionEmpleados/formEmpleado', empleado._id]);
  }
}

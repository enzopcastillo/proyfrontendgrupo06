import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  reuniones!: Array <Reunion>;

  constructor(private router: Router, private reunionService: ReunionService) { }

  ngOnInit(): void {
    this.verificacionReunion();
  }
  Sesion():void{
    this.router.navigate(['login']);
 }

 verificacionReunion(){
  this.reuniones= new Array<Reunion>();
  var date:Date= new Date;
  var fechaMes= String(date.getMonth()+1).padStart(2, '0');
  var fechaDia= String(date.getDate()).padStart(2, '0');
  //console.log(fechaMes, fechaDia);
  this.reunionService.getReuniones().subscribe(
    result=>{
      var reunion: Reunion= new Reunion;
      result.forEach((element:any) => {
        Object.assign(reunion, element);
        var [año, mes, dia]= reunion.fecha.split('-');
        if(mes < fechaMes || dia < fechaDia){
          if( reunion.estadoReunion == "pendiente" ){
            //console.log(reunion.fecha);
            reunion.estadoReunion="celebrada";
            this.modificarReunion(reunion);
            //console.log(reunion);
          }
        }
        reunion= new Reunion();
      });
    },
    error=>{}
  );
 
  
  
 }
  modificarReunion(r: Reunion){
    this.reunionService.modificarReunion(r).subscribe((r) => {
      console.log(r);
      
      });
  }
  
}

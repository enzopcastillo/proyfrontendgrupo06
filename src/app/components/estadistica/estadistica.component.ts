
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Oficina } from 'src/app/models/oficina';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReunionService } from 'src/app/services/reunion.service';
import Chart from 'chart.js/auto';
import { TipoReunion } from 'src/app/models/tipo-reunion';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  part!:Array<Empleado>;
  barras!: Chart;
  torta!: Chart;
  oficina!: Oficina;
  reunion!: Reunion;
  reuniones !: Array<Reunion>;
  oficinasReu !: Array <Oficina>;
  oficinas!:Array<Oficina>;
  participantes!: Array <Empleado>;
  cantReuniones!: Array <number>;
  infoReuniones!: Array <string>;
  empleado!: Empleado;
  empleados!: Array <Empleado>;
  meses !: Array <string>;
  años !: Array <string>;
  date!:string;
  tipo!:TipoReunion;
  tipos!: Array <TipoReunion>;
  tiposReu!: Array <TipoReunion>;
  entrada!:string;
  salida!:string;
  fechas!:Array<Date>;
  constructor(private reunionService: ReunionService, private participanteService: EmpleadoService) { 
   // this.fechasGrafica();
    this.getOficinas();
    this.getReuniones();
    //this.getParticipantes();
    this.getOficinasReu();
    this.getEmpleados();
    this.getTiposReu();
    this.mesArray();
    this.getTipos();    
    this.añoArray();
    this.meses= new Array<string>();
    this.años= new Array<string>();
    this.tiposReu= Array <TipoReunion>();
  this.tipos = new Array<TipoReunion>();
   this.part= new Array<Empleado>();
   this.fechas = new Array<Date>();
  
  }
  ngOnInit(): void {
  }

  

getOficinasReu(){
  this.oficinasReu = new Array<Oficina>();
  this.reunionService.getReuniones().subscribe((o) => {
   for(var i=0; i < o.length; i++) {
    this.oficinasReu.push(o[i].oficina);
   }
  });
  console.log(this.oficinasReu)
}

getOficinas(){
  this.oficinas = new Array<Oficina>();
  this.reunionService.getOficinas().subscribe((o) => {
   for(var i=0; i < o.length; i++) {
    this.oficinas.push(o[i]);
   }
  });
  console.log(this.oficinas)
}



getEmpleados(){
  this.empleados = new Array<Empleado>();
  this.participanteService.getEmpleados().subscribe((e) => {
    for(var i=0; i < e.length; i++) {
      
      this.empleados.push(e[i]);
     }
  });
  console.log(this.empleados)
}

getReuniones(){
  this.reuniones = new Array<Reunion>();
  this.reunionService.getReuniones().subscribe((reu)=>{
    for(var i=0; i < reu.length; i++) {
      this.reuniones.push(reu[i]);
     }
  });
  console.log(this.reuniones);
}
getTipos(){
  this.reunionService.getTiposReunion().subscribe((tip)=>{
    for(var i=0; i < tip.length; i++) {
      this.tipos.push(tip[i]);
     }
  });
  console.log(this.tipos);

}
getTiposReu(){
  this.reunionService.getReuniones().subscribe((tipR)=>{
    for(var i=0; i < tipR.length; i++) {
      this.tiposReu.push(tipR[i].tipoReunion);
     }
  });
  console.log(this.tipos);

}

// getParticipantes(){
//   var  c=0;
//   this.cantReuniones= new Array<number>();
//   this.cantReuniones=
//   this.reunionService.getReuniones().subscribe((r)=>{
//     for(var i = 0 ; i < r.length; i++){
//    for(var s = 0; s < r[i].participantes.length; s++){
//     var t=0;
//     while(t<this.empleados.length){
//        if(r[i].participantes[s] === this.empleados[t] ){
//         this.cantReuniones[t]=this.cantReuniones+c;
//        }
// }
// }
// }});
// }



graficaTorta(datos:Array<number>,mostrar:Array<string>){
  if (this.torta) {
    this.torta.destroy();
  }
  this.torta= new Chart("chartPie", {
    type:'pie',
    data: {
        labels: mostrar,
        datasets: [{
            label: 'participo en reuniones',
            data: datos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
            hoverOffset: 4
        }]
    }
});

}
graficaBarra(datos:Array<number>,mostrar:Array<string>){
  if (this.barras) {
    this.barras.destroy();
  }
  this.barras= new Chart("bar", {
    type:'bar',
    data: {
        labels: mostrar,
        datasets: [{
            label: 'reuniones',
            data: datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          
        }]
    }
});

}


oficinasGrafica(){
  this.cantReuniones= new Array<number>();
  this.infoReuniones= new Array<string>();
   var i=0,c=0, b=0;
  this.oficinas.forEach((o)=>{
        this.cantReuniones[b]=0;
        this.infoReuniones[b]="Oficina Nro. : "+o.numero;
        b++;
   });
  this.oficinasReu.forEach((oReu)=>{
      this.oficinas.forEach((ofi)=>{
        if(oReu._id==ofi._id){
              c++;
              this.cantReuniones[i]=this.cantReuniones[i]+c;
        }
        i++;
      });
  c=0;i=0;
  });
 console.log(this.cantReuniones,this.infoReuniones);
 this.graficaTorta(this.cantReuniones,this.infoReuniones);
 this.graficaBarra(this.cantReuniones,this.infoReuniones);
 
}

//Se captan los datos para grafica por mes
mesGrafica(){
     this.mesArray();
     console.log(this.meses.length);
     var mes:Array<string>;
     mes=["01","02","03","04","05","06","07","08","09","10","11","12"];
     this.cantReuniones=[0,0,0,0,0,0,0,0,0,0,0,0];
     this.infoReuniones=["Enero: ","Febrero: ","Marzo: ","Abril: ","Mayo: ","Junio: ","Julio: ","Agosto: ","Septiembre: ","Octubre: ","Noviembre: ","Diciembre: "];
      //console.log(this.meses);
    for (var i = 0; i < this.meses.length; i++) {
      var j=0;
      for (var j = 0; j < mes.length; j++) {
            if(this.meses[i]==mes[j]) {
                this.cantReuniones[j] = this.cantReuniones[j]+1;
            }
      }
    } 
     // console.log(this.cantReuniones);
    this.graficaBarra(this.cantReuniones,this.infoReuniones);
    this.graficaTorta(this.cantReuniones,this.infoReuniones);
  }

  //Aqui se saca el mes de reunion.fecha
mesArray(){
   this.reunionService.getReuniones().subscribe(res =>{
    
   for(var i=0; i<res.length; i++){
          var f = res[i].fecha.split("-");
          //console.log(f);
          if(f[0]=="2022"){
          this.meses[i]=f[1];}
     }
 
  });
  
  console.log(this.meses);
   
}

anioGrafica(){
  this.añoArray();
  var año: Array<string>;
  año=["2021", "2022", "2023","2024"];
  console.log(this.años);
  this.infoReuniones=["2021", "2022","2023","2024"];
  this.cantReuniones=[0,0,0,0]

      for (var i = 0; i < this.años.length; i++) {
        var j=0;
        for (var j = 0; j < año.length; j++) {
              if(this.años[i]==año[j]) {
                  this.cantReuniones[j] = this.cantReuniones[j]+1;
              }
        }
      } 

  this.graficaBarra(this.cantReuniones,this.infoReuniones);
    this.graficaTorta(this.cantReuniones,this.infoReuniones);
}


añoArray(){
  this.reunionService.getReuniones().subscribe(res =>{
   
  for(var i=0; i<res.length; i++){
         var f = res[i].fecha.split("-");
         //console.log(f);
         this.años[i]=f[0];
    }

 });
 
 console.log(this.años);
  
}


participanteGrafica()
{//this.getParticipantes();
  var i=0,c=0, b=0, p=0;
  this.cantReuniones= new Array<number>();
  this.infoReuniones= new Array<string>();
  var men :Array<Empleado>;
  console.log(this.participantes[9]);
  this.empleados.forEach((e)=>{
        this.cantReuniones[b]=0;
        this.infoReuniones[b]="Participante: "+e.nombre+" "+e.apellido;
        b++;
   });

   this.reunionService.getReuniones().subscribe((r)=>{
    for(var i = 0 ; i < r.length; i++){
   for(var s = 0; s < r[i].participantes.length; s++){
    var t=0;
    while(t<this.empleados.length){
       if(r[i].participantes[s] === this.empleados[t] ){
        this.cantReuniones[t]=this.cantReuniones[t]+c;
       }
}
}
}});
 
 console.log(this.cantReuniones,this.infoReuniones);
 this.graficaTorta(this.cantReuniones,this.infoReuniones);
 this.graficaBarra(this.cantReuniones,this.infoReuniones);

}

tipoGrafica(){

  var i=0;
  var j=0;
 
  //console.log(this.tipos);
  this.infoReuniones= new Array<string>();
  this.cantReuniones= new Array<number>();
  //console.log(this.tipos.length);

        for(i;i<this.tipos.length;i++){
          
        this.infoReuniones[i]=this.tipos[i].nombre;
        
        for (j;j<this.tipos.length;j++){
          this.cantReuniones[j]=0;
        }
  
  
  var x=0;
  var c=0;
  this.tiposReu.forEach((tipR)=>{
    this.tipos.forEach((tip)=>{
      if(tipR._id==tip._id){
        c++
        this.cantReuniones[x]=this.cantReuniones[x]+c;
      }
      x++;
    })     
    c=0;
    x=0;
  });



  }
  console.log(this.cantReuniones,this.infoReuniones);
 this.graficaTorta(this.cantReuniones,this.infoReuniones);
 this.graficaBarra(this.cantReuniones,this.infoReuniones);

  
}

fechasGrafica(){
  this.cantReuniones= new Array<number>();
  this.infoReuniones= new Array<string>();
  this.cantReuniones=[0,0,0];
  this.infoReuniones[0] ="Antes de: "+this.entrada ;
  this.infoReuniones[1] = "Desde: "+this.entrada+ "  Hasta: "+this.salida;
  this.infoReuniones[2] = "Despues de: "+this.salida  ;
 // this.infoReuniones[0]="Reuniones entre: "+this.entrada +" y "+ this.salida;
  var [year, month, day]= this.entrada.split("-");
  var [yearS, monthS, dayS]= this.salida.split("-");
  var start= new Date(+year, +month-1, +day);
  //console.log(start);
  var end= new Date(+yearS, +monthS-1, +dayS);
  //console.log(end);
  var i=0;
  var c=0;
  this.reuniones.forEach((reu)=>{
    //console.log(this.reuniones);
    var [y, m, d] = reu.fecha.split("-");
  //  console.log(y, m, d);
    var fecha =new Date (+y,+m-1,+d);;
   // console.log(fecha);
    this.fechas.push(fecha);
  });
     this.fechas.forEach((fecha)=>{

      if(new Date(fecha).getFullYear()<=new Date(start).getFullYear() &&
       new Date(fecha).getMonth()<=new Date(start).getMonth()&&
       new Date(fecha).getDate()<=new Date(start).getDate()){

          //   console.log(fecha.getFullYear(),fecha.getMonth(),fecha.getDate())
           //  console.log(start.getFullYear(),start.getMonth(),start.getDate())
           //  console.log(end.getFullYear(),end.getMonth(),end.getDate())
       c++;  this.cantReuniones[0]=this.cantReuniones[0] +c;  i++;    
     }
         
      
      if((new Date(fecha).getFullYear()>=new Date(start).getFullYear() &&
         new Date(fecha).getMonth()>=new Date(start).getMonth() &&
          new Date(fecha).getDate()>=new Date(start).getDate()) && 
          (new Date(fecha).getFullYear()<=new Date(end).getFullYear() &&
           new Date(fecha).getMonth()<=new Date(end).getMonth() &&
            new Date(fecha).getDate()<=new Date(end).getDate())){

           //   console.log(fecha.getFullYear(),fecha.getMonth(),fecha.getDate())
            //  console.log(start.getFullYear(),start.getMonth(),start.getDate())
            //  console.log(end.getFullYear(),end.getMonth(),end.getDate())
        c++;  this.cantReuniones[1]=this.cantReuniones[1] +c;  i++;    
      }

      if(new Date(fecha).getFullYear()>=new Date(end).getFullYear() &&
       new Date(fecha).getMonth()>=new Date(end).getMonth() &&
        new Date(fecha).getDate()>=new Date(end).getDate()){
        
          //   console.log(fecha.getFullYear(),fecha.getMonth(),fecha.getDate())
            //  console.log(start.getFullYear(),start.getMonth(),start.getDate())
            //  console.log(end.getFullYear(),end.getMonth(),end.getDate())
        c++;  this.cantReuniones[2]=this.cantReuniones[2] +c;  i++;    
      }

      c=0;  
      i=0;
    
    });

  console.log(this.cantReuniones);
 this.graficaBarra(this.cantReuniones,this.infoReuniones);
 this.graficaTorta(this.cantReuniones,this.infoReuniones);
}

}




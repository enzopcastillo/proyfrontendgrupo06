import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
@Component({
  selector: 'app-detalle-reunion',
  templateUrl: './detalle-reunion.component.html',
  styleUrls: ['./detalle-reunion.component.css']
})
export class DetalleReunionComponent implements OnInit {

  action!: boolean;
  reunion!: Reunion;
  constructor(private router: Router ,private rout: ActivatedRoute, private reunionService: ReunionService) { 
    
  }

  ngOnInit(): void {
    this.reunion = new Reunion();
    this.recibirDato();
  }

  recibirDato(){
    this.rout.params.subscribe((params) => {
      if (params['id']) {
        if (params['id'] === '') {
          this.action = false;
        }
        else {
          this.action = true;
          this.obtenerReunion(params['id']);
        }
      }
    });
}

obtenerReunion(id: string){
  this.reunionService.getReunion(id).subscribe((r)=> {
    this.reunion = r;
    console.log(this.reunion);
  })
}

  async generarPDF(){
  const pdf = new PdfMakeWrapper();
  pdf.pageMargins([40,60,40,60]);
  pdf.pageSize('A4');
  pdf.add(new Txt('Nombre: '+this.reunion.nombre).end) ;
  pdf.add(new Txt('Descripcion: '+ this.reunion.descripcion).end) ;
  pdf.add(new Txt('Fecha de la reunion: '+this.reunion.fecha).end) ;
  pdf.add(new Txt('Horario: ' + this.reunion.horaReunion +' - '+this.reunion.horaFinalizacion).end) ;
  pdf.add(new Txt('Codigo QR:').end) ;

  pdf.add(await new Img(this.reunion.codigoQr).build());

  pdf.create().open();
}

}

import {OnInit, Component, ChangeDetectionStrategy, ViewChild, TemplateRef,} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { startOfDay, endOfDay, subDays, addDays,   startOfMonth, endOfMonth, startOfWeek,
  endOfWeek, isSameDay, isSameMonth, addHours, format } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { Oficina } from 'src/app/models/oficina';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

//Colores para los eventos
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class CalendarComponent {
    
  //Variable para que el calendario aparezca en español
  locale: string = "es";

  //Modal
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  modalData!: {
    event: CalendarEvent;
    nombre: string;
    inicio: Date;
    fin: any;
    codigoQr: string;
    id:string;
  };

  //Variables para la vista
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();
  
  activeDayIsOpen: boolean = false;


  oficinas!: Array <Oficina>;

  oficina!:string;

  //Aca se agregan los eventos
  events!: CalendarEvent[];

  idReunion!: string;

  constructor(private modal: NgbModal, private reunionService: ReunionService, private toastr: ToastrService, private router: Router) {
   
  }

  ngOnInit(): void {
    this.cargarReuniones();
    
    this.cargarOficinas();

  }
  // Cargar reuniones en calendario
  cargarReuniones(): void{
    
    //var reunion: Reunion;

    this.reunionService.getReuniones().subscribe(
      result=>{
        var reunion= new Reunion();
        this.events=[];
        result.forEach((element:any) => {
          Object.assign(reunion, element);
          
          this.agregarEvento(reunion);
        });
        console.log(this.events);
        this.refresh.next();
      },
      error=>{

      }
    );
  }
  //Metodo para agregar los eventos de la BD a events del calendario
  agregarEvento(reunion: Reunion):void{
    var [year, month, day]= reunion.fecha.split('-');
    var [hours, minutes]= reunion.horaReunion.split(':');
    var [hours1, minutes1]= reunion.horaFinalizacion.split(':');
    var[seconds]='00';
    var[seconds1]='00';
    const eventoAux: CalendarEvent={
              title: reunion.nombre,
              start: new Date(+year, +month-1, +day, +hours, +minutes, +seconds),
              end: new Date(+year, +month-1, +day, +hours1, +minutes1, +seconds1),
              color:colors.blue,
              meta:{
                reunion
              }
    };
    this.events = [...this.events,eventoAux];
  }

  //Filtro por oficinas
  filtroOficinas(){
  
    this.reunionService.getReunionesOficina(this.oficina).subscribe(
      result=>{
        console.log(result);
        this.events=[];
        var reunion= new Reunion();
        result.forEach((element:any) => {
          Object.assign(reunion, element);
          this.agregarEvento(reunion);
        });
        
        this.refresh.next();
        if(this.events.length == 0 ){
          this.toastr.info('No se encontraron coincidencias');
        }
      },
      error=>{

      }
    );
  }

  //Metodo cargar select de Oficinas
  cargarOficinas(){
    this.oficinas= new Array <Oficina>();
    this.reunionService.getOficinas().subscribe(
      result=>{
        var unaOficina= new Oficina();
        result.forEach((element:any) => {
          Object.assign(unaOficina, element);
          this.oficinas.push(unaOficina);
          unaOficina= new Oficina();
        });
        console.log(this.oficinas);
      
      },
      error=>{

      }
    );
  }

  //Metodos de angular calendar

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {
      event: event,
      nombre: event.title,
      inicio: event.start,
      fin: event.end,
      codigoQr: event.meta.reunion.codigoQr,
      id: event.meta.reunion._id
    };
    this.idReunion= this.modalData.id;
    this.modal.open(this.modalContent, { size: 'md' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  verDetalle(){
    
    this.router.navigate(['detalle/reunion', this.idReunion]);
  }
}

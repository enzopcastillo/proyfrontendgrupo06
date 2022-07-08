import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalAdmiComponent } from './components/principal-admi/principal-admi.component';
import { PrincipalParticipanteComponent } from './components/principal-participante/principal-participante.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { HeaderComponent } from './components/header/header.component';

import { AvatarModule } from 'ngx-avatar';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AudienciasComponent } from './components/audiencias/audiencias.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { RegistroReunionesComponent } from './components/registro-reuniones/registro-reuniones.component';
import { FormEmpleadoComponent } from './components/form-empleado/form-empleado.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetalleReunionComponent } from './components/detalle-reunion/detalle-reunion.component';

// Modulos para el calendario
import { CalendarModule, DateAdapter } from 'angular-calendar'; 
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common'; //Se importa para que no salte errores con [view]

// Modulos para poner en idioma español el calendario
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Modulos para el pdf
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// Modulos de mensajes (ToastR)
import { ToastrModule } from 'ngx-toastr';
import { GestionReunionesComponent } from './components/gestion-reuniones/gestion-reuniones.component';

// Modulos para autorizacion (JSONWEBTOKEN)
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

// Modulos para validaciones
import { ValidacionDirective, VerificarCaracterEspecial, VerificarPrimeraLetra } from './directives/validacion.directive';

registerLocaleData(localeEs);
PdfMakeWrapper.setFonts(pdfFonts);
//
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalAdmiComponent,
    PrincipalParticipanteComponent,
    PrincipalComponent,
    HeaderComponent,
    CalendarComponent,
    AgendaComponent,
    AudienciasComponent,
    EstadisticaComponent,
    GestionEmpleadosComponent,
    RegistroReunionesComponent,
    FormEmpleadoComponent,
    FooterComponent,
    DetalleReunionComponent,
    GestionReunionesComponent,
    VerificarCaracterEspecial,
    VerificarPrimeraLetra,
    ValidacionDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    AvatarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    NgbModule,
    AlifeFileToBase64Module,
    ToastrModule.forRoot(),
  ],
  providers: [
    LoginService,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

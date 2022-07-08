import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oficina } from '../models/oficina';
import { Reunion } from '../models/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor(private http: HttpClient) { }

  urlBaseReunion="http://localhost:4000/api/reunion/";
  urlBase="http://localhost:4000/api/";

  getTiposReunion(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBase + 'tipoReunion',httpOption);
  }

  getReuniones(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBaseReunion,httpOption);
  }


  getReunionesOficina(oficinaSelected:string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
      .append("id", oficinaSelected)
    }
    return this.http.get(this.urlBaseReunion+"oficina/"+oficinaSelected,httpOption);
  }
  
  getReunionesEmpleado(participanteSelected:string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
      .append("id", participanteSelected)
    }
    return this.http.get(this.urlBaseReunion+"empleado/"+participanteSelected,httpOption);
  }

  addReunion(r:Reunion): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(r);
    console.log(body);
    return this.http.post(this.urlBaseReunion, body, httpOption);
  }

  getOficinas(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBase + 'oficina', httpOption);
  }

  modificarOficina(ofi: Oficina): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(ofi);
    return this.http.put(this.urlBase+ "oficina/" + ofi._id, body, httpOption);
  }

  modificarReunion(reunion: Reunion): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(reunion);
    return this.http.put(this.urlBaseReunion + reunion._id, body, httpOption);
  }

  getReunion(id: string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(this.urlBaseReunion+id, httpOption);
  }

  public deleteReunion(id: string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
      })
      .append("id",id)
    };
    return this.http.delete(this.urlBaseReunion+id,httpOption);
  }
}

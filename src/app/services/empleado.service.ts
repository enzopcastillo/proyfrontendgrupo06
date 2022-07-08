import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  urlBase= "http://localhost:4000/api/empleado/"

  constructor(private http: HttpClient) { }

  getEmpleados():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(this.urlBase, httpOption)
  }

  altaEmpleado(empleado: Empleado):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(empleado);
    return this.http.post(this.urlBase, body, httpOption)
  }

  modificarEmpleado(empleado: Empleado):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(empleado);
    return this.http.put(this.urlBase+empleado._id, body, httpOption);
  }

  public deleteEmpleado(id: string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
      })
      .append("id",id)
    };
    return this.http.delete(this.urlBase+id,httpOption);
  }

  getEmpleado(id: string):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.urlBase+id,httpOption);
  }
}

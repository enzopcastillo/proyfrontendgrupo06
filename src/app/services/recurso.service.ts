import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  urlBase = "http://localhost:4000/api/recurso/";

  constructor(private http: HttpClient) { }

  addRecurso(r: Recurso): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(r);
    return this.http.post(this.urlBase, body, httpOption);
  }

  getRecursos(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(this.urlBase, httpOption)
  }

  deleteRecurso(r: Recurso): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.delete(this.urlBase+r._id, httpOption)
  }
}

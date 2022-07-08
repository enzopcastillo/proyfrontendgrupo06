import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  urlBase = "http://localhost:4000/api/notificacion";

  constructor(private http: HttpClient) { }

  addNotificacion(n: Notificacion): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    let body = JSON.stringify(n);
    return this.http.post(this.urlBase, body, httpOption);
  }

  getNotificaciones(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(this.urlBase, httpOption);
  }

  getNotificacion(id: string): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this.http.get(this.urlBase + id, httpOption);
  }
}

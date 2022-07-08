import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  urlBase = "http://localhost:4000/api/dependencia/"
  constructor(private http: HttpClient) { }

  getDependencias(): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({})
    }
    return this.http.get(this.urlBase, httpOption);
  }
}

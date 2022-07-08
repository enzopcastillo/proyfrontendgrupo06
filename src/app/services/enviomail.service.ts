import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviomailService {

  urlBase="http://localhost:4000/envio";

  constructor(private http: HttpClient) { }

  sendMail(e: string, a: string, m: string, i :string): Observable<any>{

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    let params = {
      email: e,
      asunto: a,
      message: m,
      img: i
    }
    
    return this.http.post(this.urlBase, params);
  }
}

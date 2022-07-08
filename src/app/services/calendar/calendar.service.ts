import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _http: HttpClient) { }

  createEvent(event:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer ya29.A0ARrdaM-GLaghY5kPNWysFR9tZo4eNu30JbGcIbRNu6kaaqjrhdsi_fhpTrTyDczc7fgXH1qVQxwQFexiGBQOvvuH6_VX3MlyD7TPCGHQIitPRlIYZv08o07dd12M9GcXcaYzO-HczgPKeXxdwdL2eDzgydZeYUNnWUtBVEFTQVRBU0ZRRl91NjFWbmpxaDhFeXRGODBXbEMwZVF2TlB2QQ0163",
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    };

    let body = JSON.stringify(event);
    console.log(body);

    return this._http.post("https://calendar.google.com/calendar/embed?src=jn0g4cmsvfdupfh0b9pit67fi8%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires",body , httpOptions)
  }

}
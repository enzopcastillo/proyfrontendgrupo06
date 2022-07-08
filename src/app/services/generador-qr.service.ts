import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneradorQrService {

  constructor(private http:HttpClient) { }

  public getQr(url:string):Observable<any>{
    const options = {
      method: 'GET',
      params: {
        targetForQr: url,
      },
      headers: {
        'X-RapidAPI-Key': '6492501a52mshaca3715e3035d00p132080jsnafc48f674cf0',
        'X-RapidAPI-Host': 'qr-code-generator27.p.rapidapi.com'
      }
    };

    return this.http.get('https://qr-code-generator27.p.rapidapi.com/', options);
  }
}

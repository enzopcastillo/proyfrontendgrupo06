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
        'X-RapidAPI-Key': '069aaac323mshf1d3dc478dc8b7ap1db591jsn98eccca60531',
        'X-RapidAPI-Host': 'qr-code-generator27.p.rapidapi.com'
      }
    };

    return this.http.get('https://qr-code-generator27.p.rapidapi.com/', options);
  }
}

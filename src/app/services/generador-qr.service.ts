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
        'X-RapidAPI-Key': '68ebb60883mshf4e36d7b2e94800p1b3f1fjsne691a8aea58e',
        'X-RapidAPI-Host': 'qr-code-generator27.p.rapidapi.com'
      }
    };

    return this.http.get('https://qr-code-generator27.p.rapidapi.com/', options);
  }
}

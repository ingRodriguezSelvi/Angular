import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, PaymentsDetailsI } from '@app/shared/components/models/data';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MedDataService {



  constructor(private http:HttpClient) { }

  getOrder():Observable<Cobros[]>{
    let direccion = 'http://172.18.16.50:5005/'
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+localStorage.getItem('token')
      })}
      return this.http.get<Cobros[]>(direccion+'api/Data/OrdenesConDetalle',httpOptions).
      pipe(map((res:Cobros[])=>{
        return res;
      }))
  }
  getDetailsOrder(Ordernumb:number):Observable<PaymentsDetailsI[]>{
    let direccion = 'http://172.18.16.50:5005/'
    const httpOptions =
      {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+localStorage.getItem('token')
        }),
        params:new HttpParams().append('OrdNum',String(Ordernumb))
      }

      return this.http.get<PaymentsDetailsI[]>(direccion+'api/Data/HonorariosData',httpOptions)
      .pipe(map((res:PaymentsDetailsI[])=>{
        console.log(res);
        return res;

      }));

  }

}

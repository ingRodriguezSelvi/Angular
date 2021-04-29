import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, PaymentsDetailsI, Sedes } from '@app/shared/components/models/data';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MedDataService {

  direccion:string='http://172.18.16.50:5005/';

  constructor(private http:HttpClient) { }

  getSedes(){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+localStorage.getItem('token')
      })}
    return this.http.get<Sedes[]>(this.direccion+'api/Sedes/ListarSedes',httpOptions).pipe
    (map((res:Sedes[])=>{
      return res;
    }))
  }

  getOrder(x:number):Observable<Cobros[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+localStorage.getItem('token'),
        Sede: String(x)
      }),
     }
      return this.http.get<Cobros[]>(this.direccion+'api/Data/OrdenesConDetalle',httpOptions).
      pipe(map((res:Cobros[])=>{
        return res;
      }))
  }
  getDetailsOrder(Ordernumb:number,x:number):Observable<PaymentsDetailsI[]>{
    const httpOptions =
      {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+localStorage.getItem('token'),
          Sede:String(x)
        }),
        params:new HttpParams().append('OrdNum',String(Ordernumb))
      }

      return this.http.get<PaymentsDetailsI[]>(this.direccion+'api/Data/HonorariosData',httpOptions)
      .pipe(map((res:PaymentsDetailsI[])=>{
        console.log(res);
        return res;

      }));

  }

}

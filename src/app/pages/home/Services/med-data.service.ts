import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, F_MedicosI, HonoXPagar, OrdenMedica, PaymentsDetailsI, Sedes } from '@app/shared/components/models/data';
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
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })}
    return this.http.get<Sedes[]>(this.direccion+'api/Sedes/ListarSedes',httpOptions).pipe
    (map((res:Sedes[])=>{
      return res;
    }))
  }

  getOrder(x:number,a:number,m:number):Observable<Cobros[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x)
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
      return this.http.get<Cobros[]>(this.direccion+'api/Data/OrdenesConDetalle',httpOptions).
      pipe(map((res:Cobros[])=>{
        return res;
      }))
  }
  getOrderXPagar(x:number,a:number,m:number):Observable<HonoXPagar[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x)
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
     return this.http.get<HonoXPagar[]>(this.direccion+'api/data/HonorariosPorPagar',httpOptions).
      pipe(map((res:HonoXPagar[])=>{
        console.log(res)
        return res;
      }))
  }
  getOrderPrevi(x:number,a:number,m:number):Observable<Cobros[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x)
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
     return this.http.get<Cobros[]>(this.direccion+'api/Data/PagosData',httpOptions).
      pipe(map((res:Cobros[])=>{
        console.log(res)
        return res;
      }))
  }
  getOrderAgrup(x:number,a:number,m:number):Observable<OrdenMedica[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x)
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
     return this.http.get<OrdenMedica[]>(this.direccion+'api/Data/OrdenesData',httpOptions).
     pipe(map((res:OrdenMedica[])=>{
       return res;
     }))
  }
  getListMed():Observable<F_MedicosI[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
     }
     return this.http.get<F_MedicosI[]>(this.direccion+'api/Medicos/DoctorList',httpOptions).pipe
     (map((res:F_MedicosI[])=>{
       return res;
     }))
  }
  getDetailsOrder(Ordernumb:number,x:number):Observable<PaymentsDetailsI[]>{
    const httpOptions =
      {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros } from '@app/shared/components/models/data';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

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
  getDetailsOrder(){

  }

}

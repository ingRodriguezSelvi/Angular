import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesactiveMedResponseI, F_MedicosI, Promotion, RegisterMedI } from '@app/shared/components/models/data';
import { IMedFull, IMedUp } from '@app/shared/components/models/dataResponseMed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminMedService {
  url:string="http://172.18.16.50:5005/"
  constructor(private http:HttpClient) { }

registerMed(newMed:RegisterMedI):Observable<RegisterMedI>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  let direccion= this.url+"api/Medicos/InsertDoctor";
  return this.http.post<RegisterMedI>(direccion,newMed,httpOptions).
  pipe(map((res:RegisterMedI)=>{
    return res;
  }));
}
dataProfit(c:string):Observable<F_MedicosI>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    }),params:new HttpParams().append('cedula',c)
  };
  let direccion= this.url+"api/Medicos/DoctorProfitData";
  return this.http.get<F_MedicosI>(direccion,httpOptions).pipe
  (map((res:F_MedicosI)=>{
    return res;
  }))
}

updateMed(med:IMedUp):Observable<IMedFull>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  let direccion= this.url+"api/Medicos/UpdateDoctor";
  return this.http.post<IMedFull>(direccion,med,httpOptions).
  pipe(map((res:IMedFull)=>{
    return res;
  }));
}
disableMed(date:DesactiveMedResponseI):Observable<DesactiveMedResponseI>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  let direccion= this.url+"api/Medicos/EnableDisableDoctor";
  return this.http.post<DesactiveMedResponseI>(direccion,date,httpOptions).pipe
  (map((res:DesactiveMedResponseI)=>{
    return res;
  }))
}
editPromo(x:Promotion):Observable<Promotion>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  let direccion= this.url+"api/Info/EditarPromocion";
  return this.http.post<Promotion>(direccion,x,httpOptions).pipe
  (map((res:Promotion)=>{
    return res;
  }))
}

}

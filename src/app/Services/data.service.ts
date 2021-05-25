import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, F_MedicosI, Meses } from '@app/shared/components/models/data';
import { IMedFull } from '@app/shared/components/models/dataResponseMed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
direccion:string='http://172.18.16.50:5005/';
isLogin=false;
isAdmin1=false;
isDetails=false;
isLoadding=false;
isPrevimedica=false;
MesesView:Meses[]=[];
ordernesDate:Cobros[]=[];
flag=true;
msjx='';
resetFilters:boolean=true;
hC:boolean=false;
hXC:boolean=false;
hA:boolean=false;
c:boolean=true;
sede:number=0;
selectedVal:string='option1'
txtBtnDetails:string="Ver Ordenes";
anno:number=new Date().getFullYear()
mes:number=new Date().getMonth();
isMercadeo:boolean=false;
isFinanzas:boolean=false;
isCobroMed:boolean=false;
forgotCedula:string='';
  constructor(private http:HttpClient) { }

getMedicoEdit(c:string):Observable<IMedFull>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token'),
      cedula:c
    })
  };
  let direccion = "http://172.18.16.50:5005/"
  return this.http.get<IMedFull>(direccion+'api/Medicos/DoctorData',httpOptions).
    pipe(map((res:IMedFull)=>{
   return res;
  }));
}
}

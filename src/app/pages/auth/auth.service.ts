import { HttpClient } from '@angular/common/http';
import { CATCH_ERROR_VAR, NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, Type } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import {environment} from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import {JwtHelperService} from '@auth0/angular-jwt';
import{Medicos,Cobros,Monedas, EspecialidadI, MedicosI} from '@app/shared/components/models/data';
import { MedDataService } from '../home/Services/med-data.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
loger ='false';
private loggedIn = new BehaviorSubject<boolean>(false);
  url:string="http://172.18.16.50:5005/"
  constructor(private http:HttpClient,private privatemeddata:MedDataService) {
    this.readToken();
  }
  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }
  login(authData:User):Observable<UserResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };
    let direccion= this.url+"api/Login";
    return this.http.post<UserResponse>(direccion,authData,httpOptions).pipe(map((res:UserResponse)=>{
      return res;
    }
    ));
  }
  updateMedico(updData:MedicosI){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };
    let direccion= this.url+"api/Medicos/RegistrarMedico";
    return this.http.post<UserResponse>(direccion,updData,httpOptions).
      pipe(map((res:UserResponse)=>{
      console.log(res)
      return res;
    }));
  }
  logout():void{
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);

    //set userIsLogged=false
  }
  checkActivy(){

    if(sessionStorage.getItem('token')){
      this.loger='true';
      sessionStorage.setItem('loger',this.loger)
    }else{
      this.loger='false'
      sessionStorage.setItem('loger',this.loger)
    }
  }
  private readToken():void{
   // const userToken=sessionStorage.getItem('token');
   // const isExired = helper.isTokenExpired(userToken);
   // console.log('isExpired->',isExired);
    //set userisLogged = isExpired
    //isExpired ? this.logout():this.loggeIn.next(true);
  }
  private saveToken(token:string):void{
    sessionStorage.setItem('token',token);
  }
  getEspecialidad():Observable<EspecialidadI[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    let direccion = "http://172.18.16.50:5005/"
    return this.http.get<EspecialidadI[]>(direccion+'api/Info/Especialidades',httpOptions).
      pipe(map((res:EspecialidadI[])=>{
     return res;
    }));
  }
   saveMedico():Observable<MedicosI>{
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    let direccion = "http://172.18.16.50:5005/"
    return this.http.get<MedicosI>(direccion+'api/Medicos/DoctorData',httpOptions).
      pipe(map((res:MedicosI)=>{
     return res;
    }));
  }
  private handlerError(err:any):Observable<never>{
    let errorMessage = 'Un Error a ocurrido recuperando data';
    if(err){
      errorMessage=`Un Error a ocurrido recuperando data, code:
       ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

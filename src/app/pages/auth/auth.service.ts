import { HttpClient } from '@angular/common/http';
import { CATCH_ERROR_VAR, NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import {environment} from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { stringify } from '@angular/compiler/src/util';
import {JwtHelperService} from '@auth0/angular-jwt';
import{Medicos,Cobros,Monedas} from '@app/shared/components/models/data';



const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);


  url:string="http://172.18.16.50:5005/"
  constructor(private http:HttpClient) {
    this.readToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  dataMedico(){

  }
  getMedico(){


  }

  login(authData:User):Observable<UserResponse | void>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };
    let direccion= this.url+"api/Account/Login";
    return this.http.post<UserResponse>(direccion,authData,httpOptions).pipe(map((res:UserResponse)=>{

      console.log('Res->',res);
      this.saveToken(JSON.stringify(res.result));
      this.loggedIn.next(true);

    }

    ));

  }



  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    //set userIsLogged=false
  }

  private readToken():void{
   // const userToken=localStorage.getItem('token');
   // const isExired = helper.isTokenExpired(userToken);
   // console.log('isExpired->',isExired);
    //set userisLogged = isExpired
    //isExpired ? this.logout():this.loggeIn.next(true);
  }
  private saveToken(token:string):void{
    localStorage.setItem('token',token);
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
  //1:14:18 segundos
}

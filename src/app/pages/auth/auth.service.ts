import { HttpClient } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import {environment} from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AuthService {



  url:string="http://172.18.16.50:5005/"
  constructor(private http:HttpClient) {}

  login(authData:User):Observable<UserResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };
    let direccion= this.url+"api/Account/Login";
    return this.http.post<UserResponse>(direccion,authData,httpOptions);

  }
  logout():void{}

  private readToken():void{}
  private saveToken():void{}
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

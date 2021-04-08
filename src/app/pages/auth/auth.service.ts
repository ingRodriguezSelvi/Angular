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




  constructor(private http:HttpClient) {}

  login(authData:User):Observable<UserResponse | void>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };

    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`,authData)
    .pipe(map((res:UserResponse)=>{
      console.log('Res->',res);
      this.saveToken(res.token);
    }));

  }
  logout():void{}

  private readToken():void{}
  private saveToken(token:string){
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

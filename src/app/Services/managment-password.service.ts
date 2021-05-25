import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignarPass, ForgotPass, ResponseAsignarPass, ResponseCode, UserCode, UserForgotPass } from '@app/shared/components/models/dataResponsePass';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagmentPasswordService {

  constructor(private http:HttpClient) { }

  forgotPass(authData:UserForgotPass):Observable<ForgotPass>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
      })
    };
    return this.http.post<ForgotPass>(environment.API_URL+'api/Usuarios/OlvidoContrasena',authData,httpOptions)
    .pipe(map((res:ForgotPass)=>{
      console.log(res.message)
      return res;
    }))
  }
  sendCode(authdata:UserCode):Observable<ResponseCode>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
      })
    };
    return this.http.post<ResponseCode>(environment.API_URL+'api/Usuarios/ValidarCodigo',authdata,httpOptions)
    .pipe(map((res:ResponseCode)=>{
      console.log(res)
      return res;
    }))
  }
  resetPassword(authData:AsignarPass):Observable<ResponseAsignarPass>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    return this.http.post<ResponseAsignarPass>(environment.API_URL+'api/Usuarios/AsignarContrasena',authData,httpOptions)
    .pipe(map((res:ResponseAsignarPass)=>{
      console.log(res);
      return res;
    }))
  }
}

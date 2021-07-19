import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataLogInService } from './data-log-in.service';
import { User, UserResponse } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http:HttpClient,
    public dataService:DataLogInService,
    private route:Router,
    ) { }
    apiUrl = `${environment.apiurl}`;
  login(authData:User):Observable<UserResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*'
      })
    };
    return this.http.post<UserResponse>(this.apiUrl+'/Login',authData,httpOptions)
    .pipe(
      map((res:UserResponse)=>{
      return res;
    }
    ));
  }
  logout():void{
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
    this.dataService.thisIsLoggin=false;
    window.location.reload()
    this.route.navigate(['login']);
  //set userIsLogged=false
  }

  getUserByRif(rif: string) {
    if (rif && rif !== '') {
      const httpOptions = {
        params: new HttpParams()
          .append('page', 1)
          .append('perPage', 20)
          .append('filter', rif)
          .append('todas', false),
      };
      return this.http
        .get<any>(this.apiUrl + '/Paciente/', httpOptions)
        .pipe(
          map((res) => {
            return res.result.list;
          })
        );
    }
    return of(null);
  }
  
}

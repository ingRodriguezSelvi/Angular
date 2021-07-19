import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IuserModel, IusersModel, IuserspModel, UserModel, usersModel, userspModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiurl}`;


  getForPage(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IusersModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    ///api/Usuarios/GetUsuario
    return this.http
      .get<IusersModel>(this.apiUrl + '/Usuarios/', httpOptions)
      .pipe(
        map((res: IusersModel) => {
          return res;
        })
      );
  }

  getForId(item: number): Observable<IusersModel> {
    return this.http.get<IusersModel>(this.apiUrl + '/Usuarios/' + item).pipe(
      map((res: IusersModel) => {
        return res;
      })
    );
  }

  add(body: Partial<UserModel>): Observable<IuserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    return this.http.post<IuserModel>(this.apiUrl + '/Usuarios/',body, httpOptions).
    pipe(map((res:IuserModel)=>{
      return res;
    }));
  }

  update(body: Partial<usersModel>): Observable<IuserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    return this.http.put<IuserModel>(this.apiUrl + '/Usuarios/',body, httpOptions).
    pipe(map((res:IuserModel)=>{
      return res;
    }));
  }

  AssignPassword(item: Partial<userspModel>): Observable<IuserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
      }),
      // params: new HttpParams()
      //   .append('cedula', item.cedula!)
      //   .append('contrasena', item.contrasena!)        
    };
    return this.http.post<IuserModel>(this.apiUrl + '/Usuarios/AsignarContrasena/',item, httpOptions).
    pipe(map((res:IuserModel)=>{
      return res;
    }));
  }


  disable(item: number, status: number): Observable<IusersModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      }),
      params: new HttpParams()
        .append('status', status)
    }
    return this.http.patch<IusersModel>(this.apiUrl + '/Usuarios/' + item, {}, httpOptions).pipe
      (map((res: IusersModel) => {
        return res;
      }))
  }

  delete(item: number): Observable<IusersModel> {
    return this.http.delete<IusersModel>(this.apiUrl + '/Usuarios/' + item)
      .pipe(
        map((res: IusersModel) => {
          return res;
        })
      );
  }

  resetpassword(item: Partial<userspModel>): Observable<IuserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
    };
    return this.http.post<IuserModel>(this.apiUrl + '/Usuarios/OlvidoContrasena/',item).
    pipe(map((res:IuserModel)=>{
      return res;
    }));
  }

  refreshData(info: Object) {
    this.refresh.next(info);
  }
  getByRif(rif: string) {
    if (rif && rif !== '') {
      const httpOptions = {
        params: new HttpParams()
          .append('page', 1)
          .append('perPage', 20)
          .append('filter', rif)
          .append('todas', false),
      };
      return this.http
        .get<any>(this.apiUrl + '/Usuarios/GetUsuario/', httpOptions)
        .pipe(
          map((res) => {
            return res.result.list;
          })
        );
    }
    return of(null);
  }

  getByUsersRif(rif: string) {
    if (rif && rif !== '') {
      const httpOptions = {
        params: new HttpParams()
          .append('page', 1)
          .append('perPage', 20)
          .append('filter', rif)
          .append('todas', false),
      };
      return this.http
        .get<any>(this.apiUrl + '/Usuarios/', httpOptions)
        .pipe(
          map((res) => {
            return res.result.list;
          })
        );
    }
    return of(null);
  }

  



}

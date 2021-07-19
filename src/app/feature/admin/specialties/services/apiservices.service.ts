import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IspecialtiesModel, _Iespecialidades } from 'src/app/models/interfaceAdmin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  refresh: BehaviorSubject<any> = new BehaviorSubject(null);


  apiUrl = `${environment.apiurl}`

  constructor(
    public http: HttpClient
  ) { }

  getespecialides(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean): Observable<IspecialtiesModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas)
    }
    return this.http.get<IspecialtiesModel>(this.apiUrl + '/Especialidades/', httpOptions).pipe
      (map((res: IspecialtiesModel) => {
        return res;
      }))
  }
  
  getespecialidad(item: number): Observable<IspecialtiesModel> {
    return this.http.get<IspecialtiesModel>(this.apiUrl+'/Especialidades/'+item).pipe
      (map((res: IspecialtiesModel) => {
        return res;
      }))
  }

  createEspecialidad(body: _Iespecialidades): Observable<IspecialtiesModel> {
    return this.http.post<IspecialtiesModel>(`${environment.apiurl}/Especialidades/`, body)
  }

  addspecialties(body:  Partial<_Iespecialidades>): Observable<IspecialtiesModel> {
    return this.http.post<IspecialtiesModel>(this.apiUrl+'/Especialidades/', body)
  }

  disablespecialties(item: number,status:number): Observable<IspecialtiesModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('estatus', status)
    }
    return this.http.patch<IspecialtiesModel>(this.apiUrl + '/Especialidades/'+item,{}, httpOptions).pipe
      (map((res: IspecialtiesModel) => {
        return res;
      }))
  }

  updatespecialties(item: Partial<_Iespecialidades>): Observable<IspecialtiesModel> {
    //console.log('item ', item);
    return this.http.put<IspecialtiesModel>(this.apiUrl+'/Especialidades/',item )
  }

  deletespecialties(item: number): Observable<IspecialtiesModel> {
    return this.http.delete<IspecialtiesModel>(this.apiUrl+'/Especialidades/'+item)
    .pipe(
      map((res: IspecialtiesModel) => {
        //console.log('holi', res)
        return res;
      }))
  }


  refreshData(info: Object) {
    //console.log("refreshData specialties info ", info)
    this.refresh.next(info);
  }



}

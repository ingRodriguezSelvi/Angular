import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdoctorModel, _Idoctor, ILisMed } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  apiUrl=`${environment.apiurl}`

  getDoctor(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean): Observable<IdoctorModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas)
    }
    return this.http.get<IdoctorModel>(this.apiUrl+'/doctor/', httpOptions).pipe
      (map((res: IdoctorModel) => {
        console.log('holi', res)
        return res;
      }))
  }

  addDoctor(body: _Idoctor): Observable<IdoctorModel> {
    return this.http.post<IdoctorModel>(this.apiUrl+'/doctor/', body)
  }

  enableDoctor(item: Partial<_Idoctor>): Observable<_Idoctor> {
    return this.http.put<any>(`${environment.apiurl}/doctor/${item.id}/enable`, item)
  }

  disableDoctor(item: number, status: number): Observable<IdoctorModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('status', status)
    }
    return this.http.patch<IdoctorModel>(this.apiUrl + '/Medicos/EnableDisableDoctor/' + item, {}, httpOptions).pipe
      (map((res: IdoctorModel) => {
        return res;
      }))
  }

  updateDoctor(item: Partial<_Idoctor>): Observable<_Idoctor> {
    console.log('item', item);
    return this.http.patch<_Idoctor>(`${environment.apiurl}/doctor/${item.id}`, item)
  }

  deleteDoctor(item: number): Observable<IdoctorModel> {
    return this.http.delete<IdoctorModel>(this.apiUrl + '/Medicos/EnableDisableDoctor/' + item)
      .pipe(
        map((res: IdoctorModel) => {
          return res;
        })
      );
  }


  getListMed(): Observable<ILisMed[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer " + sessionStorage.getItem('token')
      })
    }
    return this.http.get<ILisMed[]>(this.apiUrl + 'api/Medicos/DoctorList', httpOptions).pipe
      (map((res: ILisMed[]) => {
        return res;
      }))
  }

  refreshData(info: Object) {
    this.refresh.next(info);
  }

}

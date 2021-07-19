import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdoctorModel, _Idoctor } from 'src/app/models/doctorModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  apiUrl = `${environment.apiurl}`;


  getDoctor(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IdoctorModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    return this.http
      .get<IdoctorModel>(this.apiUrl + '/Medicos/', httpOptions)
      .pipe(
        map((res: IdoctorModel) => {
          return res;
        })
      );
  }

  getDoctors(item: number): Observable<IdoctorModel> {
    return this.http.get<IdoctorModel>(this.apiUrl + '/Medicos/' + item).pipe(
      map((res: IdoctorModel) => {
        return res;
      })
    );
  }

  addDoctor(body: Partial<_Idoctor>): Observable<IdoctorModel> {
    return this.http.post<IdoctorModel>(this.apiUrl + '/Medicos/', body);
  }

  disableDoctor(item: number, status: number): Observable<IdoctorModel> {
    return this.http.patch<IdoctorModel>(
      `${environment.apiurl}/Medicos/${item}`,
      status
    );
  }

  updateDoctor(item: Partial<_Idoctor>): Observable<IdoctorModel> {
    console.log('item ', item);
    return this.http.put<IdoctorModel>(this.apiUrl + '/Medicos/', item);
  }

  deleteDoctor(item: number): Observable<_Idoctor> {
    return this.http.get<_Idoctor>(this.apiUrl + '/Medicos/' + item).pipe(
      map((res: _Idoctor) => {
        return res;
      })
    );
  }

  refreshData(info: Object) {
    this.refresh.next(info);
  }

}

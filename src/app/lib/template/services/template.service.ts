import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IinsiranceModel, _Iinsirance } from 'src/app/models/insiranceModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  apiUrl = `${environment.apiurl}`;


  getInsirance(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IinsiranceModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    return this.http
      .get<IinsiranceModel>(this.apiUrl + '/Paciente/', httpOptions)
      .pipe(
        map((res: IinsiranceModel) => {
          return res;
        })
      );
  }

  getInsirances(item: number): Observable<IinsiranceModel> {
    return this.http.get<IinsiranceModel>(this.apiUrl + '/Seguros/' + item).pipe(
      map((res: IinsiranceModel) => {
        return res;
      })
    );
  }

  addInsirance(body: Partial<_Iinsirance>): Observable<IinsiranceModel> {
    return this.http.post<IinsiranceModel>(this.apiUrl + '/Seguros/', body);
  }

  disableInsirance(item: number, status: number): Observable<IinsiranceModel> {
    return this.http.patch<IinsiranceModel>(
      `${environment.apiurl}/Seguros/${item}`,
      status
    );
  }

  updateInsirance(item: Partial<_Iinsirance>): Observable<IinsiranceModel> {
    console.log('item ', item);
    return this.http.put<IinsiranceModel>(this.apiUrl + '/Seguros/', item);
  }

  deleteInsirance(item: number): Observable<_Iinsirance> {
    return this.http.get<_Iinsirance>(this.apiUrl + '/Seguros/' + item).pipe(
      map((res: _Iinsirance) => {
        return res;
      })
    );
  }

  refreshData(info: Object) {
    this.refresh.next(info);
  }

}

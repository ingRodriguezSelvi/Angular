import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IinsiranceModel, _Iinsirance } from 'src/app/models/insiranceModel';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import { IstateModel } from 'src/app/models/stateModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsiranceService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

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
      .get<IinsiranceModel>(this.apiUrl + '/Seguro/', httpOptions)
      .pipe(
        map((res: IinsiranceModel) => {
          return res;
        })
      );
  }

  getInsiranceData(
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
    return this.http.get<IinsiranceModel>(this.apiUrl + '/Seguro/', httpOptions);
      
  }

  getInsirances(item: number): Observable<IinsiranceModel> {
    return this.http.get<IinsiranceModel>(this.apiUrl + '/Seguro/' + item).pipe(
      map((res: IinsiranceModel) => {
        return res;
      })
    );
  }

  addInsirance(body: Partial<_Iinsirance>): Observable<IinsiranceModel> {
    return this.http.post<IinsiranceModel>(this.apiUrl + '/Seguro/', body);
  }

  disableInsirance(item: number, status: number): Observable<IinsiranceModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('status', status)
    }
    return this.http.patch<IinsiranceModel>(this.apiUrl + '/Seguro/' + item, {}, httpOptions).pipe
      (map((res: IinsiranceModel) => {
        return res;
      }))
  }

  updateInsirance(item: Partial<_Iinsirance>): Observable<IinsiranceModel> {
    console.log('item ', item);
    return this.http.put<IinsiranceModel>(this.apiUrl + '/Seguro/', item);
  }

  deleteInsirance(item: number): Observable<IinsiranceModel> {
    return this.http.delete<IinsiranceModel>(this.apiUrl + '/Seguro/' + item)
      .pipe(
        map((res: IinsiranceModel) => {
          return res;
        })
      );
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
        .get<any>(this.apiUrl + '/Seguro/', httpOptions)
        .pipe(
          map((res) => {
            return res.result.list;
          })
        );
    }
    return of(null);
  }
  getCountry(): Observable<IcountryModel> {
    return this.http.get<IcountryModel>(this.apiUrl + '/Info/Paises');
  }
  getState(idcountry: number): Observable<IstateModel> {
    const httpOptions = {
      params: new HttpParams().append('idPais', idcountry),
    };
    return this.http.get<IstateModel>(
      this.apiUrl + '/Info/Estados',
      httpOptions
    );
  }
  getCities(idState: number): Observable<IcitiesModel> {
    const httpOptions = {
      params: new HttpParams().append('idEstado', idState),
    };
    return this.http.get<IcitiesModel>(
      this.apiUrl + '/Info/Ciudades',
      httpOptions
    );
  }
  getMunicipality(idState: number): Observable<ImunicipalityModel> {
    const httpOptions = {
      params: new HttpParams().append('idEstado', idState),
    };
    return this.http.get<ImunicipalityModel>(
      this.apiUrl + '/Info/Municipios',
      httpOptions
    );
  }

}

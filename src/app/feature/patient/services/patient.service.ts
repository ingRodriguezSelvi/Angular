import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { edadModel } from 'src/app/lib/datatable/table';
import { IacademiclevelModel } from 'src/app/models/academiclevelModel';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IedocivilModel, _Iedocivil } from 'src/app/models/edocivilModel';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import { IpatientModel, resultPatient, _Ipatient } from 'src/app/models/patientModel';
import { IrelationshipModel } from 'src/app/models/relationshipModel';
import { IstateModel } from 'src/app/models/stateModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  apiUrl = `${environment.apiurl}`;

  getpatient(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IpatientModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    return this.http
      .get<IpatientModel>(this.apiUrl + '/Paciente/', httpOptions)
      .pipe(
        map((res: IpatientModel) => {
          return res;
        })
      );
  }

  getpatients(item: number): Observable<IpatientModel> {
    return this.http.get<IpatientModel>(this.apiUrl + '/Paciente/' + item).pipe(
      map((res: IpatientModel) => {
        return res;
      })
    );
  }

  getPatientByRif(rif: string) {
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

  addpatient(body: Partial<_Ipatient>): Observable<IpatientModel> {
    return this.http.post<IpatientModel>(this.apiUrl + '/Paciente/', body);
  }

  disablepatient(item: number, status: number): Observable<IpatientModel> {
    return this.http.patch<IpatientModel>(
      `${environment.apiurl}/Paciente/${item}`,
      status
    );
  }

  updatepatient(item: Partial<_Ipatient>): Observable<IpatientModel> {
    console.log('item ', item);
    return this.http.put<IpatientModel>(this.apiUrl + '/Paciente/', item);
  }

  deletepatient(item: number): Observable<_Ipatient> {
    return this.http.get<_Ipatient>(this.apiUrl + '/Paciente/' + item).pipe(
      map((res: _Ipatient) => {
        console.log('holi', res);
        return res;
      })
    );
  }

  // query(request: DataRequest, join?: QueryJoin | QueryJoin[]): Observable<DataResponse> {
  //   const query = RequestQueryBuilder.create({
  //     page: request.page ? request.page.offset + 1 : undefined,
  //     limit: request.page ? request.page.limit : undefined,
  //     filter: request.filters ? request.filters : undefined,
  //     fields: request.fields ? request.fields : undefined,
  //     join: join ? join : undefined
  //   })

  //   let endpointUrl = `${environment.apiurl}/patient`;

  //   if (request) endpointUrl = `${endpointUrl}/?${query.query()}`;

  //   return this.http.get<DataResponse>(endpointUrl)
  // }

  getEdoCivil(): Observable<IedocivilModel> {
    return this.http.get<IedocivilModel>(this.apiUrl + '/Info/EstadoCivil');
  }

  getRelationShip(): Observable<IrelationshipModel> {
    return this.http.get<IrelationshipModel>(this.apiUrl + '/Info/Parentesco');
  }
  getAcademiclevels(): Observable<IacademiclevelModel> {
    return this.http.get<IacademiclevelModel>(this.apiUrl + '/Info/Educacion');
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
  getEdad(date: string): Observable<edadModel> {
    const httpOptions = {
      params: new HttpParams().set('fecha_Nacimiento', date),
    };
    return this.http.post<edadModel>(
      this.apiUrl + '/Info/CalcularEdad',
      httpOptions
    );
  }

  refreshData(info: Object) {
    //console.log("refreshData patient info ", info)
    this.refresh.next(info);
  }
}

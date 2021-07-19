import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter, Pipe } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, pipe } from 'rxjs';
import { take, distinctUntilChanged, debounceTime, switchMap, map, finalize, tap, first, share, toArray, concatMap, mergeMap, concatAll } from 'rxjs/operators'
import { from, of } from 'rxjs';
import { IspecialtiesModel, _Iespecialidades } from 'src/app/models/interfaceAdmin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(
    private http: HttpClient
    ) { }
  
  getespecialides(
    page:string,
    perPage:string,
    filter:string,
    todas: string): Observable<IspecialtiesModel> {      
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas)
    }
    return this.http.get<IspecialtiesModel>(`${environment.apiurl}/Especialidades/`, httpOptions).pipe
      (map((res: IspecialtiesModel) => {
        console.log('holi', res)
        return res;
      }))
  }

    createEspecialidad(body:_Iespecialidades):Observable<IspecialtiesModel>{
      return this.http.post<IspecialtiesModel>(`${environment.apiurl}/Especialidades/`,body)
    }


  
}

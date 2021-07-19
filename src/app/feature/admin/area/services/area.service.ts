import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AreaModel, IAreaModel, IinsiranceModel, _Iinsirance } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiurl}`;
  
  getForPage(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IAreaModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    return this.http
      .get<IAreaModel>(this.apiUrl + '/Area/', httpOptions)
      .pipe(
        map((res: IAreaModel) => {
          return res;
        })
      );
  }

  getData(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ): Observable<IAreaModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('page', page)
        .append('perPage', perPage)
        .append('filter', filter)
        .append('todas', todas),
    };
    return this.http.get<IAreaModel>(this.apiUrl + '/Area/', httpOptions);
      
  }

  get(item: number): Observable<IAreaModel> {
    return this.http.get<IAreaModel>(this.apiUrl + '/Area/' + item).pipe(
      map((res: IAreaModel) => {
        return res;
      })
    );
  }

  add(body: Partial<AreaModel>): Observable<IAreaModel> {
    return this.http.post<IAreaModel>(this.apiUrl + '/Area/', body);
  }

  disable(item: number, status: number): Observable<IAreaModel> {
    const httpOptions = {
      params: new HttpParams()
        .append('status', status)
    }
    return this.http.patch<IAreaModel>(this.apiUrl + '/Area/' + item, {}, httpOptions).pipe
      (map((res: IAreaModel) => {
        return res;
      }))
  }

  update(item: Partial<AreaModel>): Observable<IinsiranceModel> {
    console.log('item ', item);
    return this.http.put<IinsiranceModel>(this.apiUrl + '/Area/', item);
  }

  delete(item: number): Observable<IinsiranceModel> {
    return this.http.delete<IinsiranceModel>(this.apiUrl + '/Area/' + item)
      .pipe(
        map((res: IinsiranceModel) => {
          return res;
        })
      );
  }

  refreshData(info: Object) {
    this.refresh.next(info);
  }
 
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InsiranceService } from './insirance.service';
import { IinsiranceModel } from 'src/app/models/insiranceModel';

@Injectable({
  providedIn: 'root'
})
export class InsiranceDataService {
  languages$: Observable<any> | undefined;
  constructor(
    private insiranceServi: InsiranceService
  ) {
    //super();
    this.getInsirance();
  }

  protected getUpdateEvent(): Observable<any> {
    return of(null)
  }

  getInsirance(){
    this.insiranceServi.getInsiranceData(1, 100000, '', false).subscribe(data => {
      //console.log("InsiranceDatasource ")
      let insirance = data;
      //console.log("InsiranceDatasource ",insirance.result.list)
      return insirance;
    })
  }


}

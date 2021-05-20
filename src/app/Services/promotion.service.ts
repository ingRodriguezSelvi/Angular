import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '@app/shared/components/models/data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  //Variable//
  direccion:string='http://172.18.16.50:5005/';

  _Promociones:Promotion[]=[];

  //---//

  constructor(private http:HttpClient) { }

  getPromotions(){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        sede:'4'
      })}
    return this.http.get<Promotion[]>(this.direccion+'api/Info/Promociones',httpOptions)
    .pipe(map((res:Promotion[])=>{
      return res;
    }))
  }

}

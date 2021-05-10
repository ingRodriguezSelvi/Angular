import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
isLogin=false;
isAdmin1=false;
isDetails=false;
isLoadding=false;
isPrevimedica=false;
sede:number=0;
  constructor() { }
}

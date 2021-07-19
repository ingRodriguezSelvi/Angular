import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
  apiUrl = `${environment.apiurl}`;
}

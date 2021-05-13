import { jsDocComment } from '@angular/compiler';
import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Medicos, MedicosI } from '@app/shared/components/models/data';
import{AuthService} from '@auth/auth.service';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedDataService } from './Services/med-data.service';

/////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login=false;

  fontStyleControl = new FormControl();
  fontStyle?: string;
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  constructor(private authSvc:AuthService,private servicesMed:MedDataService,
    private router:Router ) { }
  ngOnInit(): void {
    sessionStorage.removeItem('cedula');
    sessionStorage.removeItem('password');
    if(sessionStorage.getItem('token')){
      this.login=true
    }else if(!sessionStorage.getItem('token')){
      this.login=false;
    }
    if(this.login==false){
      this.router.navigate(['login']);
    }
  }
}

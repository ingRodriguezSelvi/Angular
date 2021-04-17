import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Medicos } from '@app/shared/components/models/data';
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

  honorariosPorCancelar=false;
  fontStyleControl = new FormControl();
  fontStyle?: string;

  medico:Medicos={"codigo":" ","id":0,"nombre": " ", "rif":" "};


  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  constructor(private authSvc:AuthService,private servicesMed:MedDataService ) { }

  ngOnInit(): void {
    this.authSvc.saveMedico().subscribe(res=>{
      let medico:Medicos= res;
      this.medico=medico;
    })


  }

  cancelar(){

      this.honorariosPorCancelar=!this.honorariosPorCancelar;
      console.log(this.honorariosPorCancelar);

  }
}

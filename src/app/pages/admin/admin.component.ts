import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/Services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit(): void {

  }
  promo(){
    this.data.isMercadeo=true;
    this.data.isFinanzas=false;
  }
  medico(){
    this.data.isCobroMed=false;
    this.data.isMercadeo=false;
    this.data.isFinanzas=true;
  }

}

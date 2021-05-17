import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { F_MedicosI } from '@app/shared/components/models/data';
import { CreateMedComponent } from '../create-med/create-med.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos:F_MedicosI[]=[];
  constructor(public dialog:MatDialog,private dataService:MedDataService) { }
  ngOnInit(): void {
    this.getListMed();
  }
  addMed(){
    this.dialog.open(CreateMedComponent);
  }
  getListMed(){
    this.dataService.getListMed().subscribe(data=>{
      this.medicos=data;
    })
  }
}

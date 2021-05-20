import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { AdminMedService } from '@app/Services/admin-med.service';
import { DataService } from '@app/Services/data.service';
import { DesactiveMedResponseI, F_MedicosI } from '@app/shared/components/models/data';
import { CreateMedComponent } from '../create-med/create-med.component';
import { EditMedComponent } from '../edit-med/edit-med.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos:F_MedicosI[]=[];
  cedula:string='';
  desactive:DesactiveMedResponseI={'enable':false,'id':0};
  constructor(public dialog:MatDialog,private dataService:MedDataService,public data:DataService,private  adminService:AdminMedService) { }
  ngOnInit(): void {
    this.getListMed();
  }
  addMed(){
    this.dialog.open(CreateMedComponent);
  }
  getListMed(){
    this.dataService.getListMed().subscribe(data=>{
      console.log(data)
      this.medicos=data;

    })
  }
  getCobro(x:string){
    console.log(x)
    this.cedula=x;
    this.data.isCobroMed=true;
  }
  editMed(c:string){
    this.dialog.open(EditMedComponent,{data:{c}})
  }
  deleteMed(x:number){
    this.desactive.id=x;
    this.desactive.enable=false;
    this.adminService.disableMed(this.desactive).subscribe(data=>{
      console.log(data);
    })
  }
}

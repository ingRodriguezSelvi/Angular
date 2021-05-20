import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { AdminMedService } from '@app/Services/admin-med.service';
import { DataService } from '@app/Services/data.service';
import { EspecialidadI, F_MedicosI } from '@app/shared/components/models/data';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
  flag=false;
especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
_medico:F_MedicosI={
  'activo':false,
  'apellidos':'',
  'celular':0,
  'ciudad':'',
  'direccion':'',
  'email':'',
  'full_Name':'',
  'id':0,
  'nombres':'',
  'rif':'',
  'sexo':'',
  'zona':'',
  'extId':''
}
updateMed=this.fr.group({
  id:[''],
  extId: [''],
  nombres: [''],
  apellidos: [''],
  full_Name: [''],
  rif: [''],
  direccion: [''],
  email: [''],
  celular: [''],
  sexo: [''],
  zona: [''],
  ciudad: [''],
  especialidad: [''],
  activo: ['']
})
  constructor(@Inject(MAT_DIALOG_DATA) public data:{c:string},private fr:FormBuilder,public med:AuthService,private date:DataService,private  adminService:AdminMedService) { }

  ngOnInit(): void {
    this.med.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })
    this.flag=false;
    console.log(this.data.c)
      this.date.getMedicoEdit(this.data.c).subscribe(data=>{
        this._medico=data;
        console.log(this._medico);
        this.flag=true;
      })
  }
  updateMedi(){
    console.log(this.updateMed.value)
    const formValue=this.updateMed.value
    this.adminService.updateMed(formValue).subscribe(data=>{
      console.log(data);
    })
  }

}

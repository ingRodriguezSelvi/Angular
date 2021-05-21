import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { TermsOfServicesComponent } from '@app/pages/auth/register/terms-of-services/terms-of-services.component';
import { AdminMedService } from '@app/Services/admin-med.service';
import { EspecialidadI, F_MedicosI, MedicosI, RegisterMedI } from '@app/shared/components/models/data';

@Component({
  selector: 'app-create-med',
  templateUrl: './create-med.component.html',
  styleUrls: ['./create-med.component.css']
})
export class CreateMedComponent implements OnInit {
  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
  _flag=false;
  messageErr:string='';
_medico:RegisterMedI={'medico':{
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
},'username':'',
  'password':''
}
createdMed=this.fr.group({
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
  activo: [''],
  usuario:[''],
  password:['']
})

dateRegister:RegisterMedI={'medico':{

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

},'password':'','username':''}
  constructor(private fr:FormBuilder,private authserv:AuthService,public dialog:MatDialog,private  adminService:AdminMedService) { }

  ngOnInit(): void {
    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })

  }
  registrar(){
    this.dateRegister.medico=this.createdMed.value;
    this.dateRegister.password='Idb.1234';
    this.dateRegister.username='13262468';
    console.log(this.dateRegister)
    this.adminService.registerMed(this.dateRegister).subscribe(res=>{
      console.log(res);
    },(err=>{
      this._flag=true;
      this.messageErr=err.error;
    }))
  }
  getDataProfit(c:string){
    this.adminService.dataProfit(c).subscribe(res=>{
      console.log(c)
      this._medico.medico=res;
      console.log(this._medico)
    })
  }
  onKeydown(event: any) {
    if (event.key === "Enter") {
      console.log(event);
    }
  }
  reload(){
    this._flag=false;
  }

}

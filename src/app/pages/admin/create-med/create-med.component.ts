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
  'extId':'',
  'especialidad':0
},'username':'',
  'password':'',
  'contrato':true,
  'cortesia':true
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
  username:[''],
  password:[''],
  contrato:[''],
  cortesia:['']
})
userAcountMed=this.fr.group({
  username:[''],
  password:[''],
  contrato:[''],
  cortesia:['']
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
  'especialidad':0,
  'rif':'',
  'sexo':'',
  'zona':'',
  'extId':''

},'password':'','username':'','contrato':true,'cortesia':true}
  constructor(private fr:FormBuilder,private authserv:AuthService,public dialog:MatDialog,private  adminService:AdminMedService) { }

  ngOnInit(): void {
    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })

  }
  registrar(){
    this.dateRegister.medico.activo=this.createdMed.value.activo;
    this.dateRegister.medico.apellidos=this.createdMed.value.apellidos;
    this.dateRegister.medico.celular=this.createdMed.value.celular;
    this.dateRegister.medico.ciudad=this.createdMed.value.ciudad;
    this.dateRegister.medico.direccion=this.createdMed.value.direccion;
    this.dateRegister.medico.email=this.createdMed.value.email;
    this.dateRegister.medico.especialidad=this.createdMed.value.especialidad;
    this.dateRegister.medico.extId=this.createdMed.value.username;
    this.dateRegister.medico.full_Name=this.createdMed.value.full_Name;
    this.dateRegister.medico.id=this.createdMed.value.id;
    this.dateRegister.medico.nombres=this.createdMed.value.nombres;
    this.dateRegister.medico.rif=this.createdMed.value.rif;
    this.dateRegister.medico.sexo=this.createdMed.value.sexo;
    this.dateRegister.medico.zona=this.createdMed.value.zona;
    this.dateRegister.contrato=this.createdMed.value.contrato;
    this.dateRegister.cortesia=this.createdMed.value.cortesia;
    this.dateRegister.password=this.createdMed.value.password;
    this.dateRegister.username=this.createdMed.value.username;
    console.log(this.dateRegister)
    this.adminService.registerMed(this.dateRegister).subscribe(res=>{
      console.log(res);
    },(err=>{
      this._flag=true;
      this.messageErr=err.error;
    }))
  }
  getDataProfit(c:string){
    console.log(this.createdMed.value.cortesia)
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

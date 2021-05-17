import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { TermsOfServicesComponent } from '@app/pages/auth/register/terms-of-services/terms-of-services.component';
import { EspecialidadI, MedicosI } from '@app/shared/components/models/data';

@Component({
  selector: 'app-create-med',
  templateUrl: './create-med.component.html',
  styleUrls: ['./create-med.component.css']
})
export class CreateMedComponent implements OnInit {
  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
  registerMedForms=this.fr.group({
    id:[''],
    rif:[''],
    nombres:[''],
    apellidos:[''],
    sexo:[''],
    email:[''],
    especialidad:[''],
    celular:[''],
    zona:[''],
    ciudad:[''],
    direccion:[''],
  })
  medico:MedicosI={'id':0,'nombres':'','apellidos':'','celular':0,'ciudad':'','email':'','exId':'','rif':'','sexo':'','zona':'','direccion':''};

  constructor(private fr:FormBuilder,private authserv:AuthService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })
    this.authserv.saveMedico().subscribe(res=>{
      console.log('Direccion:',res.direccion)
      this.medico=res;
    })
  }
  registrar(x:MedicosI){

  }
  openModal(){
    if(this.registerMedForms.valid){
      return
    }
    this.dialog.open(TermsOfServicesComponent);
}
}

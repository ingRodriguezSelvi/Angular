import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EspecialidadI, MedicosI, UpdateMed } from '@app/shared/components/models/data';
import { AuthService } from '../auth.service';
import { TermsOfServicesComponent } from './terms-of-services/terms-of-services.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
  registerForms=this.fr.group({
    id:[''],
    rif:[''],
    nombres:[''],
    apellidos:[''],
    sexo:[''],
    email:[''],
    especialidad:[''],
    celular:[''],
    zona:[''],
    ciudad:['']
  })

  medico:UpdateMed={medico:{'id':0,'nombres':'','apellidos':'','celular':0,'ciudad':'','email':'','exId':'','rif':'','sexo':'','zona':''},'cedula':'','password':''};

  constructor(private fr:FormBuilder, private authserv:AuthService,
    private router:Router,public dialog:MatDialog) { }
  ngOnInit(): void {
    console.log(this.medico)
    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })
    this.authserv.saveMedico().subscribe(res=>{
      let medico:UpdateMed=this.medico;
      medico.medico=res;


    })
  }
  registrar(x:MedicosI){
    let medicoUp:UpdateMed=this.medico;
    medicoUp.medico=x;
    medicoUp.password=(localStorage.getItem('password')!);
    medicoUp.cedula=(localStorage.getItem('cedula')!);
    console.log(medicoUp)
    this.authserv.updateMedico(medicoUp).subscribe(data=>{
    this.router.navigate(['home']);
   });

  }
  openModal(){
    if(this.registerForms.valid){
      return
    }
    this.dialog.open(TermsOfServicesComponent);
}
}

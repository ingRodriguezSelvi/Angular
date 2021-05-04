import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EspecialidadI, MedicosI} from '@app/shared/components/models/data';
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
    ciudad:[''],
    direccion:[''],
  })
  medico:MedicosI={'id':0,'nombres':'','apellidos':'','celular':0,'ciudad':'','email':'','exId':'','rif':'','sexo':'','zona':'','direccion':''};
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
      console.log('Direccion:',res.direccion)
      this.medico=res;
    })
  }
  registrar(x:MedicosI){
    console.log(x)
    this.authserv.updateMedico(x).subscribe(data=>{
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecialidadI, MedicosI } from '@app/shared/components/models/data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]

  registerForms=this.fr.group({
    nombre:[''],
    apellido:[''],
    sexo:[''],
    email:[''],
    especialidad:[''],
    celular:[''],
    zona:[''],
    ciudad:[''],
  })

  constructor(private fr:FormBuilder, private authserv:AuthService,
    private router:Router) { }

  ngOnInit(): void {

    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })
  }



  registrar(){
    const formValue:MedicosI=this.registerForms.value;
    console.log(formValue);
    this.router.navigate(['home']);
  }

}

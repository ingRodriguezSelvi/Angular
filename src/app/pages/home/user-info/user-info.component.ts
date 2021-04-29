import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { MedicosI } from '@app/shared/components/models/data';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  medico:MedicosI={'celular':0,'ciudad':'','email':'','sexo':'','zona':'','apellidos':'','exId':'','id':0,'nombres':'','rif':''};
  sexo='';
  date=new Date();
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    this.authSvc.saveMedico().subscribe(res=>{
      let medico:MedicosI= res;
      this.medico=medico;
      if(medico.sexo==='F'){
        this.sexo='Dra.';
      }else if(medico.sexo==='M'){
        this.sexo='Dr.'
      }
    })
  }

}

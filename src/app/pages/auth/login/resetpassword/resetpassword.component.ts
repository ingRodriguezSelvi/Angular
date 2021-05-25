import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ManagmentPasswordService } from '@app/Services/managment-password.service';
import { FormsModule } from '@angular/forms';
import { AsignarPass, UserCode } from '@app/shared/components/models/dataResponsePass';
import { DataService } from '@app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  msjx:string='';
  flag=false;
  isLoadding=false;
  flagMsjx=false;
  cedula:string='';
  newpasswordbol=false;
  isCompleted=false;
  resetForms=this.fb.group({
    cedula:['']
  });
  restablecer=this.fb.group({
    cedula:[''],
    codigo:['']
  })
  newpassword=this.fb.group({
    cedula:[''],
    contrasena:[''],
    newpasswordrepit:['']
  })
  constructor(private fb:FormBuilder,private service:ManagmentPasswordService,public data:DataService) { }

  ngOnInit(): void {
    this.newpasswordbol=false;
    this.flag=false;
    console.log(this.data.forgotCedula)
  }
  send(){
    console.log(this.isLoadding)
    this.isLoadding=true;
    console.log(this.isLoadding)
    const authData=this.resetForms.value;
    this.data.forgotCedula=this.resetForms.value.cedula;
    console.log(this.data.forgotCedula)
    if(this.resetForms.valid){
      this.service.forgotPass(authData).subscribe(
        data=>{
          if(data.statusCode==400){
            this.flagMsjx=true;
            this.isLoadding=false;
            this.msjx=data.message;
          }
          else if(data.statusCode==200){
            this.flagMsjx=false;
            this.isLoadding=false;
            this.flag=true;
          }
        }
      )
    }
    else{
      this.flagMsjx=true;
      this.msjx='Por favor coloque su numero de cedula (12345678)';
      return;
    }
  }
  sendcode(){
  const authData=this.restablecer.value
  if(this.restablecer.valid){
    this.service.sendCode(authData).subscribe(
      data=>{
        if(data.statusCode==400){
          this.flagMsjx=true;
          this.msjx=data.message;
        }
        else if(data.statusCode==200){
          sessionStorage.setItem('token',data.result.token!)
          this.flagMsjx=false;
          this.newpasswordbol=true;
        }
      }
    )
  }
  }
  newPassword(){
    const auhData=this.newpassword
    if(auhData.value.contrasena===auhData.value.newpasswordrepit){
      let data:AsignarPass={'cedula':'','contrasena':''}
      data.cedula=auhData.value.cedula;
      data.contrasena=auhData.value.newpasswordrepit;
      this.service.resetPassword(data).subscribe(
        data=>{
          if(data.statusCode==400){
            this.flagMsjx=true;
            this.msjx=data.message;
            return
          }
          if(data.statusCode==200){
            this.flagMsjx=false
            this.isCompleted=true;
            this.newpasswordbol=false;
            this.flag=false;
            console.log(data.message)
          }
        }
      )
    }else{
      this.flagMsjx=true;
      this.msjx='La contraseñas no coinciden'
    }

  }
}

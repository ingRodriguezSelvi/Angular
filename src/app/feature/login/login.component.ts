import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResetPasswordComponent } from '../auth/components/reset-password/reset-password.component';

import { AuthService } from './auth.service';
import { DataLogInService } from './data-log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  thisislogginglocal:boolean=false
  msj:string='';
  err:boolean=false;
  loginForm = this.fb.group({
    cedula:[''],
    password:[''],
  });
  constructor(
    private authSvc:AuthService,
    private fb:FormBuilder,
    private route:Router,
    public dataService:DataLogInService,
    private ngxService: NgxUiLoaderService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
              
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.thisislogginglocal=true;
    }
    if(this.thisislogginglocal){
      this.route.navigate(['dashboard']);
    }
  }

  onLogin(){

    try {
      const formValue=this.loginForm.value;
      this.authSvc.login(formValue).subscribe(data=>{
        if (data.statusCode==400){
          console.log(data.message)
        }
        else if(data.statusCode==200){
          if(data.result.rol=="USUARIO"){
            this.dataService.isEnfermeria=true;
            sessionStorage.setItem('rol',data.result.rol);
        }
        // console.log(data)
        // console.log(data.result.rol)
        this.dataService.thisIsLoggin=false;
        sessionStorage.setItem('token',data.result.token);       
        sessionStorage.setItem('rol',data.result.rol);
       // this.route.navigate(['patient']);
        }
      })
    } catch (error) {
      console.log("error ",error)

    }

    //this.dataService.isLoggin=false;
    //this.route.navigate(['patient']);

  }
  openModal(){

  }
  save(e:any,id:string){
    if(e.key=="Enter"){
      document.getElementById(id)?.focus();
    }
  }
  onResetPassword(){
    const dialogConfig= new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
       
        const dialogRef = this.dialog.open(ResetPasswordComponent,dialogConfig);
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed){
            console.log("confirmed ",confirmed)
          }
        });
  }
}

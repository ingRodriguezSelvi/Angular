import { Component, OnInit } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import { AuthService } from '../auth.service';
import{FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/components/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alerta=false;
  msj=''
  loginForm = this.fb.group({
    cedula:[''],
    password:[''],
  });
  errorStatus= false;
  errorMsj="";
  constructor(private authSvc:AuthService, private fb:FormBuilder,
    private router:Router) { }
  ngOnInit(): void {
    this.checkToken();
  }
  checkToken(){
    if(localStorage.getItem('token')){
      this,this.router.navigate(['home']);
    }
  }
  onLogin():void{
    if(this.loginForm.invalid){
      return;
    }
    const formValue=this.loginForm.value;
    this.authSvc.login(formValue).subscribe(data=>{
      let dataResponse:UserResponse=data;
      console.log(dataResponse.message);
      if(dataResponse.Succeded==false)
      {
        this.alerta=true;
        this.msj=dataResponse.message;
      }else{
        localStorage.setItem('token',data.result.token);
        this.router.navigate(['register']);
      }
    })
 }
}

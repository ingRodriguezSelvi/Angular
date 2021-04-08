import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/components/models/user.interface';
import { AuthService } from '../auth.service';
import{FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    cedula:[''],
    password:[''],
  });
  constructor(private authSvc:AuthService, private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {

  }
  onLogin():void{

    if(this.loginForm.invalid){
      return;
    }

    const formValue=this.loginForm.value;
    this.authSvc.login(formValue).subscribe((res)=>{
      if(res){
        window.alert("Usuario o contraseña incorrectos")
      }else{

        this.router.navigate(['/home']);
      }
    })
  }


}

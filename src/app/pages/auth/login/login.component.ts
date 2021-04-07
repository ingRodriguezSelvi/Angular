import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/components/models/user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    const userData:User ={
      username: 'V12522533',
      password: 'Idb.1234',
      rememberMe:true
    };
    this.authSvc.login(userData).subscribe(data=>{console.log(data)});
  }

}

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
    const userData ={

      username: `ing.rodriguez.selvi@gmail.com`,
      password: `123456`

    };
    this.authSvc.login(userData).subscribe(data=>{console.log('Login')});
  }

}

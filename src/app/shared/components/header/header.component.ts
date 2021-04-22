import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isAdmin =false;
isLogin=false;
@Output() toggleSidenav= new EventEmitter<void>();
  constructor(private authSvc:AuthService,private router:Router) { }



  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.isLogin=true;
    }

  }

  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }

  closedSesion(){
    this.authSvc.logout();
    this.router.navigate(['login']);
    if(!localStorage.getItem('token')){
      this.isLogin=false;
    }
  }




}

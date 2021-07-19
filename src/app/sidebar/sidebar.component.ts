import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  faUser,
  faUserNurse,
  faUserMd,
  faUserCog,
  faNotesMedical,
 } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataLogInService } from '../feature/login/data-log-in.service';
import { AuthService } from '../feature/login/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faUser = faUser;
  faNotesMedical=faNotesMedical;
  nameuser: string="";
  carg:string="";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private route:Router,
    private authSvc:AuthService,
    public dataService:DataLogInService,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit(): void {

    let roles = sessionStorage.getItem('rol')
    //console.log("roles ",sessionStorage)

    this.nameuser="CLAUDIA MERCEDES BUSTAMANTE CAZANA";
    this.carg=roles!;
    switch (roles) {
      case "enfermera":
        this.faUser=faUserNurse;
        break;
      case "medico":
        this.faUser=faUserMd;
        break;
      case "lab":
        this.faUser=faNotesMedical;
        break;
      case "rx":
        this.faUser=faNotesMedical;
        break;
      default:
        this.faUser=faUser;
        break;
      }
    }
    outse(){
      this.authSvc.logout();
    }
    goToHome(){
      this.route.navigate(['dashboard']);
    }
}

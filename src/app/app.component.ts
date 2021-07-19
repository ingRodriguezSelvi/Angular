import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataLogInService } from './feature/login/data-log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'simmaterial';
  constructor(
    private ngxService: NgxUiLoaderService,
    public dataServiceAuth:DataLogInService
    ) {}

  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.dataServiceAuth.thisIsLoggin=false;
    }
      this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  flag=false;
  newpasswordbol=false;
  resetForms=this.fb.group({
    correo:['']
  });
  restablecer=this.fb.group({
    email:[''],
    codigo:['']
  })
  newpassword=this.fb.group({
    newpassword:[''],
    newpasswordrepit:['']
  })
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.newpasswordbol=false;
    this.flag=false;
  }
  send(){
    this.flag=true;
  }
  sendcode(){
    this.flag=false;
    this.newpasswordbol=true;
  }
}

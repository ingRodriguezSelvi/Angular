import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForms=this.fb.group({
    correo:['']
  });
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

}

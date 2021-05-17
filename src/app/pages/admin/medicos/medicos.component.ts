import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMedComponent } from '../create-med/create-med.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  constructor(public dialog:MatDialog) { }
  ngOnInit(): void {
  }
  addMed(){
    this.dialog.open(CreateMedComponent);
  }
}

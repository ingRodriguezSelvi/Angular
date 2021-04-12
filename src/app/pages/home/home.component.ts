import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Medicos } from '@app/shared/components/models/data';
import{AuthService} from '@auth/auth.service';
import { map } from 'rxjs/operators';

/////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Fecha de Emision', 'Fecha de Cancelacion', 'Nº Factura', 'Paciente','Monto de Honorario'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  showMedico() {
    this.authSvc.getMedico()
      .subscribe((res) => {
        console.log(res);
        return res;
      } );
  }

  constructor(private authSvc:AuthService ) { }
  ngOnInit(): void {
    let medico;
   medico=this.showMedico();


  }
}
export interface PeriodicElement {
  paciente: string;
  numeroFactura: number;
  fechaEmision: string;
  fechaCancelacion: string;
  montoHonorario:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
  {fechaEmision:'04/06/2021',fechaCancelacion:'04/06/2021',numeroFactura:20003864,paciente:'Andres Rodriguez',montoHonorario:70000000},
];

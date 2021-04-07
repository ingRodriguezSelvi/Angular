import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['Fecha de Emision', 'Fecha de Cancelacion', 'Nº Factura', 'Paciente','Monto de Honorario'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
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

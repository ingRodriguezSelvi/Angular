import { Component, OnInit } from '@angular/core';
import { Cobros } from '@app/shared/components/models/data';

const DATA:Cobros[]=[

]

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  displayedColumns: string[] = ['Fecha de emision', 'Numero de factura', 'Paciente','Cedula','Monto Honorario','Monto Honorario dolar'];
  dataSource = DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

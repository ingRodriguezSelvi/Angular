import { Component, Inject, OnInit } from '@angular/core';
import { Cobros, PaymentsDetailsI } from '@app/shared/components/models/data';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

const DATA:PaymentsDetailsI[]=[
  {numero:50013687,nombre:'FLORENCIA CARUSO',fecha:'2021-03-29T00:00:00',montoBs:45361824,montoDol:24},
  {numero:50013687,nombre:'FLORENCIA CARUSO',fecha:'2021-03-29T00:00:00',montoBs:45361824,montoDol:24},
  {numero:50013687,nombre:'FLORENCIA CARUSO',fecha:'2021-03-29T00:00:00',montoBs:45361824,montoDol:24}
]

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  displayedColumns: string[] = ['Numero de factura', 'Paciente','Fecha','Monto Honorario','Monto Honorario dolar'];
  dataSource = DATA;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{numero:number}) { }



  ngOnInit(): void {



  }

}

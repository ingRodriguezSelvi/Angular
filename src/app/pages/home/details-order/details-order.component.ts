import { Component, Inject, OnInit } from '@angular/core';
import { Cobros, PaymentsDetailsI } from '@app/shared/components/models/data';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MedDataService } from '../Services/med-data.service';



@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  displayedColumns: string[] = ['Numero de factura', 'Paciente','Fecha','Monto Honorario','Monto Honorario dolar'];
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  loadding=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{numero:number,totalBs:number,totalDol:number},private oshvc:MedDataService ) { }



  ngOnInit(): void {
    this.loadding=true
    this.dataSource=this.oshvc.getDetailsOrder(this.data.numero).subscribe(res=>{
      let orderDara:PaymentsDetailsI[]=res;
      this.dataSource=orderDara;
      this.loadding=false;
    })
  }
}

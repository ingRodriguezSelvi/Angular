import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { PaymentsDetailsI } from '@app/shared/components/models/data';

@Component({
  selector: 'app-details-payments',
  templateUrl: './details-payments.component.html',
  styleUrls: ['./details-payments.component.css']
})
export class DetailsPaymentsComponent implements OnInit {
  displayedColumns: string[] = ['Numero de factura', 'Paciente','Fecha','Monto Honorario Bs','Monto Honorario USD'];
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  totales= [{}];
  loadding=false;
  date=new Date();
  ordersDetails?:PaymentsDetailsI[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:{numero:number,totalBs:number,totalDol:number,x:number,f:Date},
  private oshvc:MedDataService ,private authSvc:AuthService) { }

  ngOnInit(): void {
    this.loadding=true
    this.oshvc.getDetailsOrder(this.data.numero,this.data.x).subscribe(res=>{
    let orderDara:PaymentsDetailsI[]=res;
    this.ordersDetails=orderDara;
    this.loadding=false;
    })
  }
}

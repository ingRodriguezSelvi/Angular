import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
import { Cobros, Medicos, OrdenMedica, Sedes } from '@app/shared/components/models/data';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { MedDataService } from '../Services/med-data.service';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {
  mes="Abril";
  honorariosPorCancelar=false;
  loadding=true;
  sedes:Sedes[]=[];
  displayedColumns: string[] = [

                                'Numero de Factura','Numero de Orden','Paciente','Fecha de la Factura',
                                'Monto en Bs','Monto en $'
                               ];
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  montoBs="";
  constructor(public dialog:MatDialog,private medSrvc:MedDataService,private service:AuthService) {}
  openModal(numero:number,totalBs:number,totalDol:number,x:number){
    this.dialog.open(DetailsOrderComponent,{data:{numero,totalBs,totalDol,x}});
  }
  ngOnInit(): void {
    this.loadding=true;
    this.medSrvc.getSedes().subscribe(data=>{
      console.log('Sedes',data);
      let dataSedes:Sedes[]=data;
      this.sedes=dataSedes;
      let aux:number= dataSedes.length;
      this.tipoSede(dataSedes[aux-1].id)
    })
  }
  tipoHono(x:string){
    if(x==='honorariosCobrados'){
      this.honorariosPorCancelar=false
    }else if(x==='honorariosXCobrar'){
      this.honorariosPorCancelar=true;
    }
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  console.log('filter', filterValue)
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
 tipoSede(x:number){
   this.loadding=true;
  this.dataSource=this.medSrvc.getOrder(x).subscribe(data=>{
    let orderData:Cobros[]= data;;
    this.dataSource=new MatTableDataSource(orderData);
    this.loadding=false;
  })
 }
}

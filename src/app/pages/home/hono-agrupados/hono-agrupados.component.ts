import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
import { DataService } from '@app/Services/data.service';
import { Cobros, Medicos, OrdenMedica, Sedes } from '@app/shared/components/models/data';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { MedDataService } from '../Services/med-data.service';
@Component({
  selector: 'app-hono-agrupados',
  templateUrl: './hono-agrupados.component.html',
  styleUrls: ['./hono-agrupados.component.css']
})
export class HonoAgrupadosComponent implements OnInit {
  txtbtn='Ordenes con detalles';
  honorariosPorCancelar=false;
  honocobrados=false;
  honoagrupados=false;
  loadding=true;
  msjx:string='';
  flag:boolean=false;
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = [
    'Numero de Factura','Factura','Paciente','Fecha','Monto Bs','Monto USD'];
   sedes:Sedes[]=[];
  constructor(public dialog:MatDialog,private medSrvc:MedDataService,public data:DataService) { }
  @Input() tiposedes?:number;
  @Input() mes?:number;
  @Input() ano?:number;
  ngOnInit(): void {
   this.loadding=true;
   console.log(this.data.isDetails)
    this.medSrvc.getSedes().subscribe(data=>{
      let dataSedes:Sedes[]=data;
      this.sedes=dataSedes;
      //  let aux:number= dataSedes.length;
     //  this.tipoSede(dataSedes[aux-1].id)
     this.tipoSede(this.tiposedes!);
    })
}
openModal(numero:number,totalBs:number,totalDol:number,x:number){
  this.dialog.open(DetailsOrderComponent,{data:{numero,totalBs,totalDol,x}});
}
tipoSede(x:number){
  this.loadding=true;
 this.dataSource=this.medSrvc.getOrderAgrup(x,Number(this.ano),Number(this.mes)).subscribe(data=>{
   let orderData:OrdenMedica[]= data;
   this.dataSource=new MatTableDataSource(orderData);
   this.loadding=false;
   if(orderData.length>0){
    this.flag=true;
  }else{
    this.flag=false;
    this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
  }
 })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
viewOrdenes(){
  if (this.honoagrupados==false){
    this.honoagrupados=true;
    this.honocobrados=false;
    this.honorariosPorCancelar=false;
    this.txtbtn='Ordenes con Detalles';
    }else if(this.honoagrupados==true){
    this.honoagrupados=false;
    this.honocobrados=true;
    this.honorariosPorCancelar=false;
    this.txtbtn='Ver Ordenes';
    }
  }
}

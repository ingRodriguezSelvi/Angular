import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
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
  mes="Abril";
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = [
    'Numero de Factura','Factura','Paciente','Fecha','Monto Bs','Monto USD'];
   sedes:Sedes[]=[];
  constructor(public dialog:MatDialog,private medSrvc:MedDataService) { }

  @Input() tiposedes?:number;

  ngOnInit(): void {
   this.loadding=true;
    this.medSrvc.getSedes().subscribe(data=>{
      console.log('Sedes',data);
      let dataSedes:Sedes[]=data;
      this.sedes=dataSedes;
    //  let aux:number= dataSedes.length;
    //  this.tipoSede(dataSedes[aux-1].id)
     this.tipoSede(this.tiposedes!);
     console.log(this.tiposedes)
    })
}
openModal(numero:number,totalBs:number,totalDol:number,x:number){
  this.dialog.open(DetailsOrderComponent,{data:{numero,totalBs,totalDol,x}});
}
tipoSede(x:number){
  this.loadding=true;
 this.dataSource=this.medSrvc.getOrderAgrup(x,2021,4).subscribe(data=>{
   let orderData:OrdenMedica[]= data;;
   this.dataSource=new MatTableDataSource(orderData);
   this.loadding=false;
   console.log(data);
 })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  console.log('filter', filterValue)
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

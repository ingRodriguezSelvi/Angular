import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
import { Cobros, Medicos, Meses, OrdenMedica, Sedes } from '@app/shared/components/models/data';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { MedDataService } from '../Services/med-data.service';
import { FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataService } from '@app/Services/data.service';
import {meses} from 'src/app/core/mocks/Constans/meses';
import { FiltersDataService } from '@app/Services/filters-data.service';
import { MatButtonToggle } from '@angular/material/button-toggle';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {
  filtroFecha=this.fr.group({
    fecha:[''],
  })
  txtbtn='Ver Ordenes';
  datee=new Date();
  mes=new Date().getMonth();
  meses:Meses[]=meses;
  mesesView:Meses[]=[];
  anos:number[]=[];
  ano=new Date().getFullYear();
  mesActual=new Date().getMonth();
  sedes:Sedes[]=[];
  msjx:string='';
  flag:boolean=false;
  isLoadding=true;
  active='active'
  active1='desactive'
  active2='desactive'
  displayedColumns: string[] = [

                                'Numero de Factura','Numero de Orden','Paciente','Fecha de la Factura',
                                'Monto en Bs','Monto en $'
                               ];
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  montoBs="";
  constructor(public dialog:MatDialog,private medSrvc:MedDataService,private service:AuthService
    ,private fr:FormBuilder,public data:DataService, private filtersData:FiltersDataService) {}
  openModal(numero:number,totalBs:number,totalDol:number,x:number,f:Date){
    this.dialog.open(DetailsOrderComponent,{data:{numero,totalBs,totalDol,x,f}});
  }
  ngOnInit(): void {
    console.log(this.mesActual)
    this.getAnos();
    let date:Date= new Date();
    this.mes=date.getMonth()+1;
    this.ano=date.getFullYear();
    this.data.hC=true
    this.data.isDetails=false;
    this.medSrvc.getSedes().subscribe(data=>{
      let dataSedes:Sedes[]=data;
      this.sedes=dataSedes;
    //  let aux:number= dataSedes.length;
    //  this.tipoSede(dataSedes[aux-1].id)
     this.tipoSede(1,this.ano,this.mes);
    })
  }
  tipoHono(x:string){
    this.filtersData.tipoHono(x);
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
 tipoSede(x:number,a:number,m:number,e?:MatButtonToggle){
    this.active='active';
    this.active1='desactive';
    this.tipoHono('option1');
    let mes= m;
    this.isLoadding=true;
    this.data.sede=x;
    this.data.isPrevimedica=false;
    this.data.hXC=false;
    if(x==4){
      this.data.isPrevimedica=true;
      this.isLoadding=false;
    }
    if(this.data.isPrevimedica==true){
      return;
    }else if(this.data.isPrevimedica==false){
    this.dataSource=this.medSrvc.getOrder(x,a,mes).subscribe(data=>{
    let orderData:Cobros[]= data;
    this.dataSource=new MatTableDataSource(orderData);
    this.isLoadding=false;
    console.log(data);
    if(orderData.length>0){
      this.flag=true;
    }else{
      this.flag=false;
      this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
    }
  })}
 }
 viewOrdenes(x:string){

  this.filtersData.viewOrdenes();
  this.txtbtn=this.data.txtBtnDetails;
 }
 getAnos(){
  this.filtersData.getAnos();
 }
 aplyFilterDate(ano:number,mes:number,idSede:number){
   this.isLoadding=true;
   this.flag=false;
   let mA=new Date().getMonth()+1
  console.log('Año',ano,'Mes',mes,'Sede',idSede,'Mes Actual',mA)
   if(mes>mA){
    console.log('Año',(ano-1),'Mes',mes,'Sede',idSede)
    this.dataSource=this.medSrvc.getOrder(idSede,ano-1,mes).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.dataSource=new MatTableDataSource(orderData);
      this.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
    })
   }else if(mA>=mes){
    this.dataSource=this.medSrvc.getOrder(idSede,ano,mes).subscribe(data=>{
      let orderData:Cobros[]= data;;
      this.dataSource=new MatTableDataSource(orderData);
      this.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
   })}
 }
 expression(x:string){
   this.tipoHono(x);
   if(this.active==='desactive'){
    this.active='active';
    this.active1='desactive';
  }
 }
 expression1(x:string){
  this.tipoHono(x);
  if(this.active1==='desactive'){
   this.active1='active1';
   this.active='desactive';
 }
}
}

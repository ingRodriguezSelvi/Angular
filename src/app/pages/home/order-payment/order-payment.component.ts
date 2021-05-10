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
  honorariosPorCancelar=false;
  honocobrados=false;
  honoagrupados=false;
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
  displayedColumns: string[] = [

                                'Numero de Factura','Numero de Orden','Paciente','Fecha de la Factura',
                                'Monto en Bs','Monto en $'
                               ];
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  montoBs="";
  constructor(public dialog:MatDialog,private medSrvc:MedDataService,private service:AuthService
    ,private fr:FormBuilder,public data:DataService) {}
  openModal(numero:number,totalBs:number,totalDol:number,x:number){
    this.dialog.open(DetailsOrderComponent,{data:{numero,totalBs,totalDol,x}});
  }
  ngOnInit(): void {
    console.log(this.mesActual)
    this.getAnos();
    let date:Date= new Date();
    this.mes=date.getMonth()+1;
    this.ano=date.getFullYear();
    this.honocobrados=true
    this.data.isLoadding=true;
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
    if(x==='honorariosCobrados'){
      this.honocobrados=true
      this.honoagrupados=false;
      this.honorariosPorCancelar=false
    }else if(x==='honorariosXCobrar'){
      this.honorariosPorCancelar=true;
      this.honocobrados=false
      this.honoagrupados=false;
    }
    else if(x==='honorariosagrupados'){
      this.honorariosPorCancelar=false;
      this.honocobrados=false
      this.honoagrupados=true;
    }
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
 tipoSede(x:number,a:number,m:number){
   console.log('Esta cargando la sede',x);
    let mes= m;
    this.data.isLoadding=true;
    this.data.sede=x;
    this.data.isPrevimedica=false;
    if(x==4){
      this.data.isPrevimedica=true;
    }
    if(this.data.isPrevimedica==true){
      return;
    }else if(this.data.isPrevimedica==false){
    this.dataSource=this.medSrvc.getOrder(x,a,mes).subscribe(data=>{
    let orderData:Cobros[]= data;
    this.dataSource=new MatTableDataSource(orderData);
    this.data.isLoadding=false;
    console.log(data);
    if(orderData.length>0){
      this.flag=true;
    }else{
      this.flag=false;
      this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
    }
  })}
 }
 viewOrdenes(){
   if (this.honoagrupados==false){
     this.honoagrupados=true;
     this.honocobrados=false;
     this.honorariosPorCancelar=false;
     this.data.isDetails=true;
     this.txtbtn='Ordenes con Detalles';
   }else if(this.honoagrupados==true){
     this.honoagrupados=false;
     this.honocobrados=true;
     this.honorariosPorCancelar=false;
     this.data.isDetails=false;
     this.txtbtn='Ver Ordenes';
   }
 }

 getAnos(){
   let fechaMax = new Date().getFullYear();
   let fechaMin= 2013;
   let mesesMenos=12;

   for(var i=fechaMax; i!=fechaMin; i--){
     var ano=i;
     this.anos.push(ano);
   }
   for(var x=new Date().getMonth();x>=0;x--){
    mesesMenos--;
    this.mesesView.push(this.meses[x])
   }
  if(mesesMenos>=0){
    this.ano=this.ano-1;
    let n=1;
    for(var x=mesesMenos; x>0;x--){
      this.mesesView.push(this.meses[12-n])
      n++;
    }
  }
 }
 aplyFilterDate(ano:number,mes:number,idSede:number){
  let mesActual=new Date().getMonth();
  let nuevoanio=ano;
  this.mes=mes;
  this.ano=ano;
  console.log(this.data.isDetails);
  console.log(this.data.sede)
  if(this.data.sede===4){
    console.log('Aplica Filtro de fecha')
    return;
  }
  if(this.data.isDetails==true){
   return  this.viewOrdenes();
  }else if(this.data.isDetails==false){
   if(mes>mesActual){
    this.dataSource=this.medSrvc.getOrder(idSede,nuevoanio-1,mes).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
    })
   }else if(mesActual>=mes){
    this.dataSource=this.medSrvc.getOrder(idSede,nuevoanio,mes).subscribe(data=>{
      let orderData:Cobros[]= data;;
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
   })}
  }
  this.data.isLoadding
 }
}

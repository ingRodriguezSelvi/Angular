import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '@app/Services/data.service';
import { Cobros } from '@app/shared/components/models/data';
import { MedDataService } from '../Services/med-data.service';

@Component({
  selector: 'app-previ',
  templateUrl: './previ.component.html',
  styleUrls: ['./previ.component.css']
})
export class PreviComponent implements OnInit {
@Input() mes?:number
anno= new Date().getFullYear();
displayedColumns: string[] = ['numero','fecha','montoBs'];
dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
flag:boolean=false;
msjx:string='';
  constructor(public data:DataService,private orderServices:MedDataService) { }

  ngOnInit(): void {
    this.data.isLoadding=true;
    this.getOrderPrevi()
  }
  getOrderPrevi(){
    console.log(this.mes)
    this.dataSource=this.orderServices.getOrderPrevi(4,this.anno,this.mes!).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha o sede';
      }
  })
  }
  searchDate(){
    console.log(this.mes)
    this.dataSource=this.orderServices.getOrderPrevi(4,this.anno,this.mes!).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha o sede';
      }
  })
  }
}

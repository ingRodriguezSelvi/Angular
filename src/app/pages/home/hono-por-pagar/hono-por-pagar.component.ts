import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '@app/Services/data.service';
import { HonoXPagar } from '@app/shared/components/models/data';
import { MedDataService } from '../Services/med-data.service';

@Component({
  selector: 'app-hono-por-pagar',
  templateUrl: './hono-por-pagar.component.html',
  styleUrls: ['./hono-por-pagar.component.css']
})
export class HonoPorPagarComponent implements OnInit {
  @Input() tiposedes?:number;
  @Input() mes?:number;
  @Input() ano?:number;
  flag:boolean=false;
  msjx:string='';
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = [
    'numero','fecha','nombre','montoBs','montoDol',];
  constructor(private medSrvc:MedDataService,public data:DataService) { }

  ngOnInit(): void {
    this.getOrder();
  }
  getOrder(){
    this.dataSource=this.medSrvc.getOrderXPagar(this.tiposedes!,this.ano!,this.mes!).
    subscribe(data=>{
      let orderData:HonoXPagar[]=data;
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
    })
  }

}

import { Injectable } from '@angular/core';
import { meses } from '@app/core/mocks/Constans/meses';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { Cobros, Meses } from '@app/shared/components/models/data';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersDataService {

  meses:Meses[]=meses;
  anos:number[]=[];
  ano=new Date().getFullYear();
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  constructor(public data:DataService,public medSrvc:MedDataService) { }

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
     this.data.MesesView.push(this.meses[x])
    }
   if(mesesMenos>=0){
     this.ano=this.ano-1;
     let n=1;
     for(var x=mesesMenos; x>0;x--){
       this.data.MesesView.push(this.meses[12-n])
       n++;
     }
   }
  }
  tipoHono(x:string){
    if(x==='option1'){
      this.data.hC=true
      this.data.hA=false;
      this.data.hXC=false
    }else if(x==='option2'){
      this.data.hXC=true;
      this.data.hC=false
      this.data.hA=false;
    }
    else if(x==='honorariosagrupados'){
      this.data.hXC=false;
      this.data.hC=false
      this.data.hA=true;
    }
  }
  viewOrdenes(){
    if (this.data.hA==false){
      this.data.hA=true;
      this.data.hC=false;
      this.data.hXC=false;
       this.data.isDetails=true;
       this.data.txtBtnDetails='Ordenes con Detalles';
     }else if(this.data.hA==true){
      this.data.hA=false;
      this.data.hC=true;
      this.data.hXC=false;
       this.data.isDetails=false;
       this.data.txtBtnDetails='Ver Ordenes';
     }
  }
}

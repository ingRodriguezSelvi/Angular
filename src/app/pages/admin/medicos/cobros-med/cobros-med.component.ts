import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { meses } from '@app/core/mocks/Constans/meses';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { DataService } from '@app/Services/data.service';
import { FiltersDataService } from '@app/Services/filters-data.service';
import { Cobros, HonoXPagar, Meses, OrdenMedica, Sedes } from '@app/shared/components/models/data';

@Component({
  selector: 'app-cobros-med',
  templateUrl: './cobros-med.component.html',
  styleUrls: ['./cobros-med.component.css']
})

export class CobrosMedComponent implements OnInit {
  sedes:Sedes[]=[];
  @Input() cedula?:string
  anno= new Date().getFullYear();
  meses:Meses[]=meses;
  msjx:string='';
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  flag:boolean=false;
  mesActual=new Date().getMonth();
  cobrosPrevi:Cobros[]=[];
  cobrosCobrar:Cobros[]=[];
  cobrosXCobrar:HonoXPagar[]=[];
  cobrosAgroup:OrdenMedica[]=[];
  isCobrosCobrar=false;
  isXcobrar=false;
  isAgrup=false;
  constructor(public medServices:MedDataService, public data:DataService,
    private filtersData:FiltersDataService) { }

  ngOnInit(): void {
    this.getSedes();
    this.getAnnos();
  }
  getSedes(){
    this.medServices.getSedes().subscribe(data=>{
      this.sedes=data;
    })
  }
  getAnnos(){
    this.filtersData.getAnos();
  }
  getOrder(s:number,h:number,v:number,f:number){
    console.log(s,h,v,f)
    if(s==4 && h==1 && v==1){
      this.data.isPrevimedica=true;
      this.isCobrosCobrar=false;
      this.isXcobrar=false;
      this.isAgrup=false;
     this.getPrevi(s,this.data.anno,f)
    }
    else if(s==4 && h!=1 && v!=1 || s==4 && h==1 && v!=1 ||s==4 && h!=1 && v==1 ){
      console.log('Erro en busqueda previmedica')
    }
    else if(s!=4 && h==1 && v==1){
      //orden por clinica por cobrar detalles
      this.isCobrosCobrar=true;
      this.data.isPrevimedica=false;
      this.isXcobrar=false;
      this.isAgrup=false;
      this.getOrderPayment(this.data.anno,f,s,this.cedula!)
      console.log('orden por clinica cobrados detalles')
    }
    else if(s!=4 && h==2 && v==1 ){
      //Honorarios por clinica por cobrar
      this.isXcobrar=true;
      this.isCobrosCobrar=false;
      this.data.isPrevimedica=false;
      this.isAgrup=false;
      this.getXcobrar(this.data.anno,f,s,this.cedula!)
      console.log('Honorarios por clinica por cobrar')
    }
    else if(s!=4 && h==2 && v==2 ){
      console.log('Error aplicando filtros')
    }
    else if(s!=4 && h==1 && v==2){
      console.log('Honorarios por cobrar agrupadas')
      this.isAgrup=true;
      this.isXcobrar=false;
      this.isCobrosCobrar=false;
      this.data.isPrevimedica=false;
      this.getAgroup(this.data.anno,f,s,this.cedula!);
      //Honorarios cobrados agrupadas
    }
  }
  getPrevi(s:number,a:number,m:number){
    if(m==12){
      this.mesActual=11
    }
    this.flag=false;
    let aA:number=new Date().getFullYear()-1
    let mA:number=new Date().getMonth()+1
    if(m>mA){
      this.dataSource=this.medServices.getOrderPrevi(s,aA,m,this.cedula)
      .subscribe(data=>{
        let orderData:Cobros[]=data;
        this.cobrosPrevi=orderData;
        this.data.isLoadding=false;
        console.log(data)
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }else if(mA>=m){
      this.medServices.getOrderPrevi(s,a,m,this.cedula)
      .subscribe(data=>{
        let orderData:Cobros[]=data;
        this.cobrosPrevi=orderData;
        this.data.isLoadding=false;
        console.log(data)
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }
  }
  getOrderPayment(a:number,m:number,s:number,c:string){
    let aA:number=new Date().getFullYear()-1
    let mA:number=new Date().getMonth()+1
    if(m>mA){
      console.log('Año',(a-1),'Mes',m,'Sede',s)
      this.dataSource=this.medServices.getOrder(s,a-1,m,c).subscribe(data=>{
        let orderData:Cobros[]= data;
        this.cobrosCobrar=orderData;
        console.log(this.cobrosCobrar)
       // this.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
     }else if(mA>=m){
      this.dataSource=this.medServices.getOrder(s,a,m,c).subscribe(data=>{
        let orderData:Cobros[]= data;
        this.cobrosCobrar=orderData;
        console.log(this.cobrosCobrar)
       // this.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
     })}
  }
  getXcobrar(a:number,m:number,s:number,c:string){
    if(m==12){
      this.mesActual=11;
    }
  //  this.isLoadding=true;
    this.flag=false;
    let aA=new Date().getFullYear()-1
    let mA=new Date().getMonth()+1
    console.log(this.mesActual)
    console.log(meses)
    console.log('Mes Actual',mA,'Mes Seleccionado',m)
    if(m>mA){
      this.medServices.getOrderXPagar(s,aA,m,c)
      .subscribe(data=>{
        let orderData:HonoXPagar[]=data;
        this.cobrosXCobrar=orderData;
       // this.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }else if(mA>=m){
      console.log(a,m,s)
      this.medServices.getOrderXPagar(s,a,m,c)
          .subscribe(data=>{
            let orderData:HonoXPagar[]=data;
            this.cobrosXCobrar=orderData;
          // this.isLoadding=false;
            if(orderData.length>0){
              this.flag=true;
            }else{
              this.flag=false;
              this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
            }
      })
    }
  }
  getAgroup(a:number,m:number,s:number,c:string){
    if(m==12){
      this.mesActual=11;
    }
    this.flag=false;
    //this.loadding=true
    let mA=new Date().getMonth()+1
    let aA=new Date().getFullYear()-1
    console.log('Estoy aqui')
      if(m>mA){
      //  this.loadding=true
      console.log('entre')
        this.medServices.getOrderAgrup(s,aA,m,c)
        .subscribe(data=>{
          let orderData:OrdenMedica[]=data;
          this.cobrosAgroup=orderData;
          console.log(data)
         // this.loadding=false;
          if(orderData.length>0){
            this.flag=true;
          }else{
            this.flag=false;
            this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
          }
        })
      }else if(mA>=m){
        console.log('entre 2')
        this.medServices.getOrderAgrup(s,a,m,c)
        .subscribe(data=>{
          let orderData:OrdenMedica[]=data;
          this.cobrosAgroup=orderData;
          console.log(data)
        //  this.loadding=false;
          if(orderData.length>0){
            this.flag=true;
          }else{
            this.flag=false;
            this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
          }
        })
      }
  }
}

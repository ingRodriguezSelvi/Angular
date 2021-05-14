import { Injectable } from '@angular/core';
import { Cobros, Meses } from '@app/shared/components/models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
isLogin=false;
isAdmin1=false;
isDetails=false;
isLoadding=false;
isPrevimedica=false;
MesesView:Meses[]=[];
ordernesDate:Cobros[]=[];
flag=true;
msjx='';
resetFilters:boolean=true;
hC:boolean=false;
hXC:boolean=false;
hA:boolean=false;
c:boolean=true;
sede:number=0;
selectedVal:string='option1'
txtBtnDetails:string="Ver Ordenes";
anno:number=new Date().getFullYear()
mes:number=new Date().getMonth();
isMercadeo:boolean=false;
isFinanzas:boolean=false;
  constructor() { }
}

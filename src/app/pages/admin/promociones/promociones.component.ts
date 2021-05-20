import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PromotionService } from '@app/Services/promotion.service';
import { OrdenMedica, Promotion } from '@app/shared/components/models/data';
import { EditPromoComponent } from '../edit-promo/edit-promo.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = ['id','imgUrl','title','content','link','acciones'];
  constructor(public dataPromotions:PromotionService,public dialog:MatDialog) { }
  loadding=true;
  ngOnInit(): void {
    this.loadding=true;
    this.getPromotion();

  }
  openEdit(n:number){
    console.log(n)
    this.dialog.open(EditPromoComponent,{data:{n}});
  }
  openCreate(){

  }
  delete(x:number){
  this.dataPromotions._Promociones.splice(x,1)
  }
  getPromotion(){
    this.dataSource=this.dataPromotions.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.dataSource=new MatTableDataSource(orderData);
      console.log(data)
      this.loadding=false;
    })
  }

}

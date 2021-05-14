import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromotionService } from '@app/Services/promotion.service';
import { EditPromoComponent } from '../edit-promo/edit-promo.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = ['img','tittle','content','link','acciones'];
  constructor(public dataPromotions:PromotionService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.dataPromotions.getPromotions();
    this.dataSource=this.dataPromotions._Promociones;

  }
  openEdit(n:number){
    this.dialog.open(EditPromoComponent,{data:{n}});
  }
  openCreate(){

  }
  delete(x:number){
  this.dataPromotions._Promociones.splice(x,1)
  }

}

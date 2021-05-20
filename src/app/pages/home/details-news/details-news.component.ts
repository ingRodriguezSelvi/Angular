import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminMedService } from '@app/Services/admin-med.service';
import { PromotionService } from '@app/Services/promotion.service';
import { Promotion } from '@app/shared/components/models/data';

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
  promotion:Promotion={'id':0,'title':'','content':'','imageUrl':'','link':''}
  constructor(@Inject(MAT_DIALOG_DATA) public data:{x:number},public date:AdminMedService,public dataPromotion:PromotionService) { }

  ngOnInit(): void {
    this.getPromo();
  }
  getPromo(){
    this.dataPromotion.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.promotion=orderData[this.data.x-1];
    })
  }
}

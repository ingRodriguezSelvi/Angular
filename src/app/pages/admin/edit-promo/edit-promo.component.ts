import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionService } from '@app/Services/promotion.service';
import { Promotion } from '@app/shared/components/models/data';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.css']
})
export class EditPromoComponent implements OnInit {

  editNews=this.fb.group({
    id:[''],
    img:[''],
    tittle:[''],
    content:[''],
    link:['']
  });
  promotion:Promotion={'id':0,'tittle':'','content':'','img':'','link':''}
  constructor(@Inject(MAT_DIALOG_DATA) public data:{n:number},private fb:FormBuilder,public dataPromotion:PromotionService) { }

  ngOnInit(): void {
    this.promotion=this.dataPromotion._Promociones[this.data.n];
  }
  edit(x:Promotion){
    this.dataPromotion._Promociones.splice(this.data.n,1,{
      'id':this.data.n,
      'img':x.img,
      'tittle':x.tittle,
      'content':x.content,
      'link':x.link
    })
    console.log(this.data.n)
    console.log(this.dataPromotion._Promociones[this.data.n])
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminMedService } from '@app/Services/admin-med.service';
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
    imageUrl:[''],
    title:[''],
    content:[''],
    link:['']
  });
  promotion:Promotion={'id':0,'title':'','content':'','imageUrl':'','link':''}
  constructor(@Inject(MAT_DIALOG_DATA) public data:{n:number},public date:AdminMedService,private fb:FormBuilder,public dataPromotion:PromotionService) { }

  ngOnInit(): void {
    this.getPromo();
  }
  edit(){
    const formValue=this.editNews.value
    this.date.editPromo(formValue).subscribe(res=>{
      console.log(res);
    })
  }
  getPromo(){
    this.dataPromotion.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.promotion=orderData[this.data.n-1];
    })
  }

}

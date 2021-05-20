import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { PromotionService } from '@app/Services/promotion.service';
import { MedicosI, Promotion } from '@app/shared/components/models/data';
import { DetailsNewsComponent } from '../details-news/details-news.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  medico:MedicosI={'celular':0,'ciudad':'','email':'','sexo':'','zona':'','apellidos':'','id':0,'nombres':'','rif':'','direccion':''};
  sexo='';
  date=new Date();
  promotions:Promotion[]=[];
  constructor(private authSvc:AuthService,public dataPromotions:PromotionService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPromotions();
    this.authSvc.saveMedico().subscribe(res=>{
      let medico:MedicosI= res;
      this.medico=medico;
      if(medico.sexo==='F'){
        this.sexo='Dra.';
      }else if(medico.sexo==='M'){
        this.sexo='Dr.'
      }
    })
  }
  getPromotions(){
    this.dataPromotions.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
     this.promotions=orderData;
      console.log(data)
    })
  }
  getDetailNews(x:number){
    this.dialog.open(DetailsNewsComponent,{data:{x}});
  }

}

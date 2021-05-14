import { Injectable } from '@angular/core';
import { Promotion } from '@app/shared/components/models/data';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  //Variable//

  _Promociones:Promotion[]=[];

  //---//

  constructor() { }

  getPromotions(){
    this._Promociones=[
      {'id':0,'img':'https://idbclinicas.com/wp-content/uploads/2019/11/67655613-c44a-4a6a-a9b3-8b850c35edc4-1.png','tittle':'Orden Universidad Yacambú 2019','content':'Some quick example text to build on the card title and make up the bulk of the cards content.',
      'link':'Lorem Impsun.com'},
      {'id':1,'img':'https://idbclinicas.com/wp-content/uploads/2020/10/1552f1d9-ecb5-4461-af4f-b72f70f5490a-Recuperado-1.jpg','tittle':'Clínica IDB Cabudare inicia servicio especializado en cirugía de columna','content':'Some quick example text to build on the card title and make up the bulk of the cards content.',
      'link':'Lorem Impsun.com'}
    ]
    console.log(this._Promociones)
  }

}

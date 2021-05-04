import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MaterialModule} from '@app/material.module';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { DetailsOrderComponent } from './details-order/details-order.component';
import { FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './user-info/user-info.component';
import { HonoAgrupadosComponent } from './hono-agrupados/hono-agrupados.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrderPaymentComponent,
    DetailsOrderComponent,
    UserInfoComponent,
    HonoAgrupadosComponent,

  ],
  entryComponents:[DetailsOrderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule


  ]
})
export class HomeModule { }

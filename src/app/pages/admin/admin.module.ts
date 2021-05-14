import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.module';
import { PromocionesComponent } from './promociones/promociones.component';
import { MedicosComponent } from './medicos/medicos.component';
import { EditPromoComponent } from './edit-promo/edit-promo.component';
import { EditMedComponent } from './edit-med/edit-med.component';
import { CreatePromoComponent } from './create-promo/create-promo.component';
import { CreateMedComponent } from './create-med/create-med.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    PromocionesComponent,
    MedicosComponent,
    EditPromoComponent,
    EditMedComponent,
    CreatePromoComponent,
    CreateMedComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }

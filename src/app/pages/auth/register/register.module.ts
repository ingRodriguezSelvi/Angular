import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsOfServicesComponent } from './terms-of-services/terms-of-services.component';


@NgModule({
  declarations: [
    RegisterComponent,
    TermsOfServicesComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class RegisterModule { }

import { NgModule } from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import{MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatAutocompleteModule} from '@angular/material/autocomplete';


//lista autocompleta
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
//Spinner el de cargando
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//relleno interno de boton donde hacer clic
import {MatRippleModule} from '@angular/material/core';
//ordena tabla
import {MatSortModule} from '@angular/material/sort';
//tabulad
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
//paso a paso para wizzar
import {MatStepperModule} from '@angular/material/stepper';


const myModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSlideToggleModule,



  MatAutocompleteModule,

  MatChipsModule,

  MatExpansionModule,
  MatGridListModule,

  MatProgressBarModule,
  MatProgressSpinnerModule,

  MatRippleModule,

  MatSortModule,

  MatTabsModule,

  MatTooltipModule,
  MatStepperModule,

];

@NgModule({
  imports: [...myModules],
  exports: [...myModules],

})

export class MaterialModule { }

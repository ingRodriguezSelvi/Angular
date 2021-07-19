import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInsiranceComponent } from './components/form-insirance/form-insirance.component';
import { FormInsiranceEditComponent } from './components/form-insirance-edit/form-insirance-edit.component';
import { ListInsiranceComponent } from './components/list-insirance/list-insirance.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { TextMaskModule } from 'angular2-text-mask';
import { SearhComponent } from './components/list-insurance/searh/searh.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


const ngxUiLoadConfig: NgxUiLoaderConfig = {
  bgsColor: '#0077bc',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#0077bc',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'ball-spin-clockwise',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 75,
  //logoUrl: 'assets/img/IDB-Cabudare-2.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#0077bc',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: 'Trabajamos por su bienestar',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};


@NgModule({
  declarations: [
    FormInsiranceComponent,
    FormInsiranceEditComponent,
    ListInsiranceComponent,
    SearhComponent,
    
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoadConfig),
    MaterialModule,  
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    NgSelectModule, 
    FormsModule,
    TextMaskModule,
    

  ]
})
export class InsuranceModule { }

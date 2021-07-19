import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormPatientComponent } from './components/form-patient/form-patient.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MaterialModule } from 'src/app/material/material.module';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormPatientEditComponent } from './components/form-patient-edit/form-patient-edit.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormResponPatientComponent } from './components/form-respon-patient/form-respon-patient.component';

import { TextMaskModule } from 'angular2-text-mask';

//import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';



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
  declarations: [ FormPatientComponent, ListPatientsComponent, FormPatientEditComponent, FormResponPatientComponent],
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

    
    AutocompleteLibModule





  ],
  providers: [DatePipe],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PatientModule { }

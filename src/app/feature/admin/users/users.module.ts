import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { FormUsersEditComponent } from './components/form-users-edit/form-users-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatIconModule, MatDatepickerModule, MatCheckboxModule, MatSnackBarModule, MatDialogModule } from 'src/app/material';
import { MaterialModule } from 'src/app/material/material.module';
import { FormUsersAssignPasswordComponent } from './components/form-users-assign-password/form-users-assign-password.component';


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
    ListUsersComponent,
    FormUsersComponent,
    FormUsersEditComponent,
    FormUsersAssignPasswordComponent
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
    TextMaskModule

  ]
})
export class UsersModule { }

import {  CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';
import localeEsVe from '@angular/common/locales/es-VE';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { PatientModule } from './feature/patient/patient.module';
import { SpecialtiesModule } from './feature/admin/specialties/specialties.module';
import { DoctorModule } from './feature/admin/doctor/doctor.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalModule } from './lib/modal/modal.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { InsuranceModule } from './feature/admin/insurance/insurance.module';
import { LoginComponent } from './feature/login/login.component';
import { TextMaskModule } from 'angular2-text-mask';
import { UsersModule } from './feature/admin/users/users.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AuthModule } from './feature/auth/auth.module';
import { AreaModule } from './feature/admin/area/area.module';


registerLocaleData(localeEsVe);

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
  logoSize: 120,
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
    AppComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoadConfig),
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FontAwesomeModule,
    NgbModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    PatientModule,
    HttpClientModule,
    SpecialtiesModule,
    MatNativeDateModule,
    DoctorModule,
    ModalModule,
    NgSelectModule,
    FormsModule,
    InsuranceModule,
    TextMaskModule,
    UsersModule,
    AutocompleteLibModule,
    AuthModule,
    AreaModule


  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ve',useClass: HashLocationStrategy }],
  exports: [
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormAreaEditComponent } from './feature/admin/area/components/form-area-edit/form-area-edit.component';
import { FormAreaComponent } from './feature/admin/area/components/form-area/form-area.component';
import { ListAreaComponent } from './feature/admin/area/components/list-area/list-area.component';
import { FormDoctorComponent } from './feature/admin/doctor/components/form-doctor/form-doctor.component';
import { ListDoctorComponent } from './feature/admin/doctor/components/list-doctor/list-doctor.component';
import { FormInsiranceEditComponent } from './feature/admin/insurance/components/form-insirance-edit/form-insirance-edit.component';
import { FormInsiranceComponent } from './feature/admin/insurance/components/form-insirance/form-insirance.component';
import { ListInsiranceComponent } from './feature/admin/insurance/components/list-insirance/list-insirance.component';
import { FormSpecialtiesEditComponent } from './feature/admin/specialties/components/form-specialties-edit/form-specialties-edit.component';
import { FormSpecialtiesComponent } from './feature/admin/specialties/components/form-specialties/form-specialties.component';
import { ListSpecialtiesComponent } from './feature/admin/specialties/components/list-specialties/list-specialties.component';
import { FormUsersEditComponent } from './feature/admin/users/components/form-users-edit/form-users-edit.component';
import { FormUsersComponent } from './feature/admin/users/components/form-users/form-users.component';
import { ListUsersComponent } from './feature/admin/users/components/list-users/list-users.component';
import { AuthGuard } from './feature/login/guards/guard';
import { FormPatientEditComponent } from './feature/patient/components/form-patient-edit/form-patient-edit.component';
import { FormPatientComponent } from './feature/patient/components/form-patient/form-patient.component';
import { ListPatientsComponent } from './feature/patient/components/list-patients/list-patients.component';
const routes: Routes = [
  { path:'', redirectTo:'/login',pathMatch:'full'},
  { path:'login',loadChildren:()=> import('./feature/login/login.module').then(m=>m.LoginModule)},
  { path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard] },
  { path:'patient', component:ListPatientsComponent,canActivate: [AuthGuard] },
  { path:'formpatient', component:FormPatientComponent,canActivate: [AuthGuard] },
  { path:'formeditpatient', component:FormPatientEditComponent,canActivate: [AuthGuard] },
  { path:'specialties', component:ListSpecialtiesComponent,canActivate: [AuthGuard] },
  { path:'formspecialties', component:FormSpecialtiesComponent,canActivate: [AuthGuard] },
  { path:'formeditspecialties', component:FormSpecialtiesEditComponent,canActivate: [AuthGuard] },
  { path:'doctor', component:ListDoctorComponent,canActivate: [AuthGuard] },
  { path:'formdoctor', component:FormDoctorComponent,canActivate: [AuthGuard] },
  { path:'insurance', component:ListInsiranceComponent,canActivate: [AuthGuard] },
  { path:'forminsurance', component:FormInsiranceComponent,canActivate: [AuthGuard] },
  { path:'formeditinsurance', component:FormInsiranceEditComponent,canActivate: [AuthGuard] },
  { path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard] },

  { path:'users',component:ListUsersComponent,canActivate:[AuthGuard] },
  { path:'formusers', component:FormUsersComponent,canActivate:[AuthGuard]},
  { path:'foreditusers', component:FormUsersEditComponent,canActivate:[AuthGuard] },

  { path:'area',component:ListAreaComponent,canActivate:[AuthGuard] },
  { path:'formarea', component:FormAreaComponent,canActivate:[AuthGuard]},
  { path:'foreditarea', component:FormAreaEditComponent,canActivate:[AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


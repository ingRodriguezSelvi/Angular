import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IusersModel, IuserspModel, userspModel } from 'src/app/models';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-users-assign-password',
  templateUrl: './form-users-assign-password.component.html',
  styleUrls: ['./form-users-assign-password.component.scss']
})
export class FormUsersAssignPasswordComponent implements OnInit {
  title = 'Asignar Contraseña';
  Urlnavform = 'users';
  Urlnavformedit = 'formeditusers';
  Urlnavlist = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dataView: any;
  dataUser: any;
  dataPatient: any;
  iForm!:  FormGroup
  npass:boolean=false;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //services name
    private servi: UsersService,
  ){
    this.dataView = this.servi.refresh.asObservable();
    this.dataView.subscribe((res: any) => {
      this.dataUser = res;

      //this.status = this.dataUser === null ? false : true;
      //this.initFormMode();
      //console.log("this.dataUser ",this.dataUser);
      if (this.dataUser == null) {
        this.router.navigateByUrl(this.Urlnavform);
      }
      else {
        this.initFormMode();
      }
    });
  }

  ngOnInit(): void {
  }
  onCancel() {
    this.router.navigateByUrl(this.Urlnavform);
  }
  initFormMode() {
    this.servi.getForId(this.dataUser).subscribe(data => {
      let patient: IusersModel = data;
      this.dataPatient = patient.result
      //console.log("this.dataSpecialty ", this.dataPatient)

      this.iForm = this.fb.group({
        id: [this.dataPatient ? this.dataPatient.id : '', Validators.required],
        cedula: [this.dataPatient ? this.dataPatient.rif : '', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)],
          ],
        password: ['', [Validators.required,Validators.minLength(6),
          Validators.maxLength(10)]
        ]
      });
    })

  }

  onSubmit(){
    let patient: Partial<userspModel> = this.getFormData();
    this.npass=true;
    this.servi.AssignPassword(patient).subscribe((data) => {
      let patients = data;

        this.snackbar.open(patients.message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: [!patients.succeeded ? 'danger-snackbar' : 'success-snackbar'],
        });
        if (patients.succeeded) {
          this.router.navigateByUrl(this.Urlnavform);
      }

    });

  }
  getFormData(): Partial<userspModel>|any {
    let raw = this.iForm.value;
    //console.log("raw ", raw)
    let patients: Partial<userspModel>={
      cedula: raw.cedula,
      contrasena: raw.password
    }
    return patients;
  }



}

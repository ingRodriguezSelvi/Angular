import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsersService } from 'src/app/feature/admin/users/services/users.service';
import { UsersTable } from 'src/app/lib/datatable';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IuserModel, IusersModel, IuserspModel, userspModel } from 'src/app/models';

@Component({
  selector: 'app-form-assign-password-modal',
  templateUrl: './form-assign-password-modal.component.html',
  styleUrls: ['./form-assign-password-modal.component.scss'],
})
export class FormAssignPasswordModalComponent implements OnInit {
  title = 'Asignar Contraseña';
  navigateListUrl = 'users';
  navigateAddUrl = 'formusers';
  navigateEditUrl = 'foreditusers';
  icoselect = 'done';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  iForm!: FormGroup;
  dataView: any;
  dataPatient: any;
  dataRepon: any;
  dataUser: any;

  patientss:any;
  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //nombre del servicio
    private Servi: UsersService
  ) {}

  ngOnInit(): void {
    this.dataView = this.Servi.refresh.asObservable();
    // console.log("this.dataUser ",this.dataView);
    this.dataView.subscribe((res: any) => {
      this.dataUser = res;

      //this.status = this.dataUser === null ? false : true;
      //this.initFormMode();
      //console.log("this.dataUser ",this.dataUser);
      if (this.dataUser == null) {
        this.router.navigateByUrl(this.navigateListUrl);
      } else {
        //console.log("cargando hacia initFormMode",);
        //  this.patientServi.getpatients(this.dataUser).subscribe(data=>{
        //     let patient:IpatientModel=data;
        //     this.dataPatient=patient.result.list});
        //   console.log("this.dataPatient ",this.dataPatient)
        //        this.initFormMode();
        this.initFormMode();
      }
    });
  }

  initFormMode() {
    this.Servi.getForId(this.dataUser).subscribe((data) => {
      let patient = data;
      this.dataPatient = patient.result;
      //console.log("tlf ",patient.result)
      this.iForm = this.fb.group({
        id: [this.dataPatient ? this.dataPatient.id : '', Validators.required],
        name: [
          this.dataPatient ? this.dataPatient.nombres : '',
          Validators.required,
        ],
        cedula: [
          this.dataPatient ? this.dataPatient.rif : '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        npassword: ['', Validators.required],
      });
    });
  }
  getFormData(): Partial<userspModel> | any {
    let raw = this.iForm.value;
    let patients: Partial<userspModel> = {
      cedula: raw.cedula,
      contrasena: raw.npassword.trim(),
    };
    return patients;
  }

  onSubmit() {
    let patient: Partial<userspModel> = this.getFormData();
    let patients: IuserModel;
    if (this.iForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: '¿Estás seguro de que quieres guardar?',
          buttonText: {
            ok: 'Si',
            cancel: 'No',
          },
        },
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          try {
            this.Servi.AssignPassword(patient).subscribe((data) => {
              patients = data;
              this.patientss=data
              console.log("Message sql ",this.patientss.Message)

              this.snackbar.open(!patients.succeeded ? patients.message : patients.Message, '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
                panelClass: [
                  !patients.succeeded ? 'danger-snackbar' : 'success-snackbar',
                ],
              });
              if (patients.succeeded) {
                this.router.navigateByUrl(this.navigateListUrl);
              }
            });
          } catch (err) {
            console.log('error', err.message);
            this.snackbar.open('', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['alert-snackbar'],
            });
          }
        } 
        else 
        {
          // const dialogConfig = new MatDialogConfig();
          // dialogConfig.disableClose = true;
          // dialogConfig.autoFocus = true;
          // dialogConfig.data = {
          //   icon: 'warning',
          //   message: 'Complete los campos faltantes',
          //   buttonText: {
          //     cancel: 'Aceptar',
          //   },
          // };
          // const dialogRef = this.dialog.open(
          //   AlertDialogComponent,
          //   dialogConfig
          // );
        }
      });
    }
  }
}

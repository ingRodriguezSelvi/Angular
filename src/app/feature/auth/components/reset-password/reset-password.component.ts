import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/feature/admin/users/services/users.service';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { userspModel, IuserModel } from 'src/app/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  title = 'Olvido la contraseña';
  navigateListUrl = 'login';
  navigateAddUrl = 'login';
  navigateEditUrl = 'login';
  icoselect = 'done';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  iForm!: FormGroup;
  dataView: any;
  dataPatient: any;
  dataRepon: any;
  dataUser: any;

  patientss: any;
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
    this.initFormMode();
  }

  initFormMode() {
    this.iForm = this.fb.group({
      cedula: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
        this.validateRifNotTaken.bind(this),
      ],
    });
  }
  getFormData(): Partial<userspModel> | any {
    let raw = this.iForm.value;
    let patients: Partial<userspModel> = {
      cedula: raw.cedula,
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
            this.Servi.resetpassword(patient).subscribe((data) => {
              patients = data;
              this.patientss=data
              if (this.patientss.Message!="undefined"){
                console.log("Message sql ",this.patientss.Message)
              }

              this.snackbar.open(patients.succeeded ? patients.message : patients.Message, '', {
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
        } else {
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

  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.Servi.getByUsersRif(rifSearch).pipe(
      map((resp) => {
        return resp && resp.length == 0 ? { rifTaken: true } : null;
      })
    );
  }

  save(e:any){
    if(e.key=="Enter"){
      //document.getElementById(id)?.focus();
      //this.onSubmit();
    }
  }
}

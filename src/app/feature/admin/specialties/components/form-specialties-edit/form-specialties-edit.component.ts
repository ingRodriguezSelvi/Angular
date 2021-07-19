import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../services/apiservices.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { IspecialtiesModel, resultEspecialides, _Iespecialidades } from 'src/app/models/interfaceAdmin';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-form-specialties-edit',
  templateUrl: './form-specialties-edit.component.html',
  styleUrls: ['./form-specialties-edit.component.scss']
})
export class FormSpecialtiesEditComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dataView: any;
  dataUser: any;
  specialtyform!: FormGroup;
  dataSpecialty: any;
  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private Servi: ApiservicesService,
    public snackbar: MatSnackBar,
    public datepipe: DatePipe,
    private dialog: MatDialog,
  ) {

    this.dataView = this.Servi.refresh.asObservable();
    this.dataView.subscribe((res: any) => {
      this.dataUser = res;

      //this.status = this.dataUser === null ? false : true;
      //this.initFormMode();
      //console.log("this.dataUser ",this.dataUser);
      if (this.dataUser == null) {
        this.router.navigateByUrl("specialties");
      }
      else {
        this.initFormMode();
      }


    });
  }

  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }
  initFormMode() {
    this.Servi.getespecialidad(this.dataUser).subscribe(data => {
      let specialty: resultEspecialides = data.result;
      this.dataSpecialty = specialty
      console.log("this.dataSpecialty ",this.dataSpecialty)
      this.specialtyform = this.fb.group({
        //id: [this.dataSpecialty ? this.dataSpecialty.id : ''],
        specialty: [this.dataSpecialty ? this.dataSpecialty.especialidad : ''],
        //activo: [this.dataSpecialty ? this.dataSpecialty.activo : true]
      })
    })

  }

  getFormData(): Partial<_Iespecialidades> {
    let raw = this.specialtyform.value;
    let specialtys: Partial<_Iespecialidades> = {
      id: this.dataSpecialty.id,
      especialidad: raw.specialty.toUpperCase(),
      activo: this.dataSpecialty.activo
    }
    return specialtys;
  }


  onCancel() {
    this.router.navigateByUrl('specialties');
  }

  onSubmit(): void {
    let data: Partial<_Iespecialidades> = this.getFormData();
    //console.log('formulario ', patient)

    if (this.specialtyform.invalid == true) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        icon: 'warning',
        //icon:'done',
        //icon:'dangerous',
        message: 'Complete los campos faltantes',
        buttonText: {
          cancel: 'Aceptar',
        },
      }
      const dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
      return
    }
    else {


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
            this.Servi.updatespecialties(data).subscribe(data => {
              let dataResponse: IspecialtiesModel = data;

              this.snackbar.open(data.message, '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
                panelClass: [!data.succeeded ? 'danger-snackbar' : 'success-snackbar'],
              });
              if (data.succeeded) {
                this.router.navigateByUrl('specialties');
              }
            })
          }
          catch (err) {
            console.log("error", err.message)
            this.snackbar.open('', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['alert-snackbar'],
            });

          }
        } else {
          this.snackbar.open('Cancelo el agregar', '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000,
            panelClass: ['idb-snackbar'],
          });
        }
      });

    }
  }

}

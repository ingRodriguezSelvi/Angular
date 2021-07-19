import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { IspecialtiesModel } from 'src/app/models/interfaceAdmin';
import { ApiservicesService } from '../../services/apiservices.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-form-specialties',
  templateUrl: './form-specialties.component.html',
  styleUrls: ['./form-specialties.component.scss']
})


export class FormSpecialtiesComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  registerEsp=this.fb.group({
    id:[0],
    especialidad:[''],
    activo:[true]
  })


  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private srv:ApiservicesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }

  onCancel() {
    this.router.navigateByUrl('specialties');
  }

  onSubmit(){
    if(this.registerEsp.invalid){
        const dialogConfig= new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.data={
          icon:'warning',
          //icon:'done',
          //icon:'dangerous',
          message: 'Complete los campos faltantes',
          buttonText: {
            cancel: 'Aceptar',
          },
        }
        const dialogRef = this.dialog.open(AlertDialogComponent,dialogConfig);
      return
    }else
    {
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
            const data = this.registerEsp.value
            this.srv.createEspecialidad(data).subscribe(data => {
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

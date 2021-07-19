import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IpatientModel } from 'src/app/models/patientModel';
import { PatientService } from '../../services/patient.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedIndex: number = 0

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = false;


  //displayedColumns = ['Historia', 'Cédula', 'Nombres y Apellidos', 'fecha','Teléfono', 'mail', 'id'];
  displayedColumns = ['Historia', 'Cédula', 'Nombres y Apellidos', 'Teléfono', 'mail', 'id'];

  displayedColumn=[]
  dataSource: any;
  tiporif: any;
  columns = [
    { titulo: 'Historia', name: 'id' },
    { titulo: 'Cédula', name: 'rif' },
    { titulo: 'Nombres y Apellidos', name: 'name' },
    //{ name: 'Edad', name:'id'}
    //{ name: 'Acciones rapidas', name: 'Action' },
  ];

  Searchform = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private patientServi: PatientService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);
    this.getPatients();
  }
  onSubmit() {
    if (this.Searchform.invalid) {
      return console.log('Completa los campos')
    } else {
      let search= this.Searchform.value
      console.log('onSubmit ', search.buscar)
    }
  }
  onSearchPatient(){
    let search= this.Searchform.value
    console.log("search ", search.buscar)
    this.patientServi.getpatient(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let patient: IpatientModel = data;
      this.dataSource = patient.result.list
    })
  }

  getPatients() {
    this.patientServi.getpatient(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let patient: IpatientModel = data;
      this.dataSource = patient.result.list
    })
  }

  onChangePage(event: any) {
    //console.log(event);
    if (event.pageIndex == 0) {
      this.pageIndex = 1
    } else {
      this.pageIndex = event.pageIndex;
    }
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.getPatientsPage(this.pageIndex, this.pageSize, '', this.todas);
  }

  getPatientsPage(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ) {
    this.patientServi.getpatient(page, perPage, filter, todas).subscribe(data => {
      let patient: IpatientModel = data;
      this.dataSource = patient.result.list
    })
  }


  onNewPatient(){
    this.router.navigateByUrl("formpatient");
  }
  onSelectEdit(i: number) {
    //console.log("onSelectEdit ",i);
    this.patientServi.refreshData(i);
    this.router.navigateByUrl("formeditpatient");
  }
  onSelectView(event: any) {
    console.log("onSelectView history ", event);
    this.patientServi.refreshData(event);

  }
  onSelectDelete(event: any) {
    console.log("onSelectDelete ", event);
    this.patientServi.refreshData(event);

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: '¿Estás seguro de que quieres eliminar?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        this.patientServi.disablepatient(event, 0).subscribe(data => {
          let patient = data;
          console.log("elimina ", patient);

          if (patient.statusCode != 200) {
            this.snackbar.open(patient.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['danger-snackbar']
            });
          }
          else {
            switch (patient.succeeded) {
              case true:
                //this.snackbar.open(patient.message, '', {
                  this.snackbar.open('Se a eliminado el paciente con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['success-snackbar']
                });
                this.getPatients();
                break;

              default:
                this.snackbar.open(patient.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['alert-snackbar']
                });
                this.getPatients();
                break;
            }
          }
          this.dataSource = patient.result.list
        })

        // this.snackbar.open('Se a eliminado el paciente con exito ', '', {
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        //   duration: 3000,
        //   panelClass: ['success-snackbar']
        // });
      }
      else {
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['idb-snackbar']
        });
      }
    });
  }

  onSelectAddtriaje(event: any) {
    console.log("onSelectAddtriaje ", event);
    this.patientServi.refreshData(event);
  }


  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackbar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackbar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }
}

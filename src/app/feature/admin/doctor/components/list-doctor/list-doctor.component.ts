import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IdoctorModel } from 'src/app/models/doctorModel';

import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedIndex: number = 0

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = false;


  displayedColumns = ['Historia', 'Cédula', 'Nombres y Apellidos', 'Teléfono', 'id'];
  dataSource: any;
  tiporif: any;

  form = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    //el servicio del componente
    private Servi: DoctorService,
  ) { }


  ngOnInit(): void {
   //ui-loader
   this.ngxService.start();
   setTimeout(() => {
     this.ngxService.stop();
   }, 100);
  }

  onSearch(){
    let search= this.form.value
    //console.log("search ", search.buscar)
    this.Servi.getDoctor(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let Doctor: IdoctorModel = data;
      this.dataSource = Doctor.result.list
    })
  }

  getDoctors() {
    this.Servi.getDoctor(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let Doctor: IdoctorModel = data;
      this.dataSource = Doctor.result.list
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
    this.getDoctorsPage(this.pageIndex, this.pageSize, '', this.todas);
  }

  getDoctorsPage(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ) {
    this.Servi.getDoctor(page, perPage, filter, todas).subscribe(data => {
      let Doctor: IdoctorModel = data;
      this.dataSource = Doctor.result.list
    })
  }


  onNew(){
    //add form
    this.router.navigateByUrl("formdoctor");
  }


  onSelectEdit(i: number) {
    this.Servi.refreshData(i);
    //edit form
    this.router.navigateByUrl("formeditdoctor");
  }

  onSelectDelete(event: any) {
    //console.log("onSelectDelete ", event);
    //delete form
    this.Servi.refreshData(event);

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

        this.Servi.disableDoctor(event, 0).subscribe(data => {
          let Doctor = data;
          //console.log("elimina ", Doctor);

          if (Doctor.statusCode != 200) {
            this.snackbar.open(Doctor.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['danger-snackbar']
            });
          }
          else {
            switch (Doctor.succeeded) {
              case true:
                //this.snackbar.open(Doctor.message, '', {
                  this.snackbar.open('Se a eliminado con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['success-snackbar']
                });
                this.getDoctors();
                break;

              default:
                this.snackbar.open(Doctor.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['alert-snackbar']
                });
                this.getDoctors();
                break;
            }
          }
          this.dataSource = Doctor.result.list
        })
      }
      else {
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['idb-snackbar']
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IdoctorModel } from 'src/app/models';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedIndex: number = 0

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = true;

  displayedColumns = ['rif','razon_social',  'Teléfono','status', 'id'];
  dataSource: any;
  tiporif: any;

  Searchform = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private DoctorServi: DoctorsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    this.getDoctors();
  }

  onSearch(){
    let search= this.Searchform.value
    //console.log("search ", search.buscar)
    this.DoctorServi.getDoctor(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let Doctor: IdoctorModel = data;
      this.dataSource = Doctor.result.list
    })
  }

  getDoctors() {
    this.DoctorServi.getDoctor(this.pageIndex, this.pageSize, '', this.todas)
    .subscribe((data: IdoctorModel) => {
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
    this.DoctorServi.getDoctor(page, perPage, filter, todas).subscribe(data => {
      let Doctor: IdoctorModel = data;
      this.dataSource = Doctor.result.list
    })
  }


  onNew(){
    this.router.navigateByUrl("formdoctor");
  }


  onSelectEdit(i: number) {
    this.DoctorServi.refreshData(i);
    this.router.navigateByUrl("formeditdoctor");
  }

  onSelectDelete(event: any) {
    console.log("onSelectDelete ", event);
    this.DoctorServi.refreshData(event);

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

        this.DoctorServi.deleteDoctor(event).subscribe(data => {
          let Doctor = data;
          console.log("elimina ", Doctor);

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
        this.getDoctors();
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['idb-snackbar']
        });
      }
    });
  }

  onchange(event:any,id:any){
    //console.log("onchange check ",event.checked,id)
    this.DoctorServi.refreshData(event);
    let dialogRef:any;
    let action:number=0;
    if (event.checked){
      action=0;
     dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: '¿Estás seguro de que quieres activar?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });
  }
  else
  {
    action=1;
    dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: '¿Estás seguro de que quieres desactivar?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });
  }
  //console.log("pasa activa o desactiva " );
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.DoctorServi.disableDoctor(id,action).subscribe(data=>{
          let specialite=data;
          console.log("activa o desactiva ", id,action);

          if (specialite.statusCode != 200) {
            this.snackbar.open(specialite.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['danger-snackbar']
            });
          }
          else {
            switch (specialite.succeeded) {
              case true:
                //this.snackbar.open(specialite.message, '', {
                  this.snackbar.open('Se a desactivado  con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['success-snackbar']
                });
                this.getDoctors();
                break;

              default:
                this.snackbar.open(specialite.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['alert-snackbar']
                });
                this.getDoctors();
                break;
            }
          }
          this.dataSource = specialite.result.list
        })
      }
      else {
        this.getDoctors();
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

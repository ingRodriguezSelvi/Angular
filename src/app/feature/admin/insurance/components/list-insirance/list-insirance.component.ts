import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
import { InsiranceService } from '../../services/insirance.service';
import { IinsiranceModel } from 'src/app/models/insiranceModel';

@Component({
  selector: 'app-list-insirance',
  templateUrl: './list-insirance.component.html',
  styleUrls: ['./list-insirance.component.scss']
})
export class ListInsiranceComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedIndex: number = 0

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = true;


  displayedColumns = ['rif','razon_social',  'Teléfono', 'id'];
  displayedColumn=[]
  dataSource: any;
  tiporif: any;

  Searchform = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private insiranceServi: InsiranceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    this.getInsirances();
  }

  onSearchInsirance(){
    let search= this.Searchform.value
    console.log("search ", search.buscar)
    this.insiranceServi.getInsirance(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
    })
  }

  getInsirances() {
    let search= this.Searchform.value
    console.log("getInsirances ", search.buscar)
    this.insiranceServi.getInsirance(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
      //console.log("this.dataSource ",this.dataSource)
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
    this.getinsirancesPage(this.pageIndex, this.pageSize, '', this.todas);
  }

  getinsirancesPage(
    page: number,
    perPage: number,
    filter: string,
    todas: boolean
  ) {
    this.insiranceServi.getInsirance(page, perPage, filter, todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
    })
  }


  onNewInsirance(){
    this.router.navigateByUrl("forminsurance");
  }


  onSelectEdit(i: number) {
    this.insiranceServi.refreshData(i);
    this.router.navigateByUrl("formeditinsurance");
  }

  onSelectDelete(event: any) {
    //console.log("onSelectDelete ", event);
    this.insiranceServi.refreshData(event);

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

        this.insiranceServi.deleteInsirance(event).subscribe(data => {
          let insirance = data;
          //console.log("elimina ", insirance);

          if (insirance.statusCode != 200) {
            this.snackbar.open(insirance.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000,
              panelClass: ['danger-snackbar']
            });
          }
          else {
            switch (insirance.succeeded) {
              case true:
                //this.snackbar.open(insirance.message, '', {
                  this.snackbar.open('Se a eliminado con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['success-snackbar']
                });
                this.getInsirances();
                break;
              default:
                this.snackbar.open(insirance.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['alert-snackbar']
                });
                this.getInsirances();
                break;
            }
          }
          this.dataSource = insirance.result.list
        })
      }
      else {
        this.getInsirances();
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
    this.insiranceServi.refreshData(event);
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
        this.insiranceServi.disableInsirance(id,action).subscribe(data=>{
          let specialite=data;
          //console.log("activa o desactiva ", id,action);

          if (specialite.statusCode != 200) {
            this.snackbar.open(specialite.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
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
                  duration: 3000,
                  panelClass: ['success-snackbar']
                });
                this.getInsirances();
                break;

              default:
                this.snackbar.open(specialite.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['alert-snackbar']
                });
                this.getInsirances();
                break;
            }
          }
          this.dataSource = specialite.result.list
        })
      }
      else {
        this.getInsirances();
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['idb-snackbar']
        });
      }
    });

  }


}

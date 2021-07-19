import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InsiranceService } from 'src/app/feature/admin/insurance/services/insirance.service';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IinsiranceModel } from 'src/app/models/insiranceModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  title='seguro'
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

  Searchform = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,    
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    //el servicio del componente
    private insiranceServi: InsiranceService,
  ) { }
  

  ngOnInit(): void {
   //ui-loader
   this.ngxService.start();
   setTimeout(() => {
     this.ngxService.stop();
   }, 100);      
  }

  onSearchInsirance(){
    let search= this.Searchform.value
    //console.log("search ", search.buscar)
    this.insiranceServi.getInsirance(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
    })
  }

  getInsirances() {
    this.insiranceServi.getInsirance(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let insirance: IinsiranceModel = data;
      this.dataSource = insirance.result.list
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
    //add form
    this.router.navigateByUrl("forminsurance");
  }
  
  
  onSelectEdit(i: number) {
    this.insiranceServi.refreshData(i);
    //edit form
    this.router.navigateByUrl("formeditinsurance");
  }

  onSelectDelete(event: any) {
    //console.log("onSelectDelete ", event);
    //delete form
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

        this.insiranceServi.disableInsirance(event, 0).subscribe(data => {
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
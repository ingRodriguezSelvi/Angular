import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IAreaModel } from 'src/app/models';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-list-area',
  templateUrl: './list-area.component.html',
  styleUrls: ['./list-area.component.scss']
})
export class ListAreaComponent implements OnInit {
  title='area';
  navigateListUrl='area';
  navigateAddUrl='formarea';
  navigateEditUrl='foreditarea';
  icoselect ='done';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedIndex: number = 0

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = true;


  displayedColumns = ['nombre',  'status', 'id'];
  displayedColumn=[]
  dataSource: any;
  tiporif: any;

  iform = this.fb.group({
    buscar: ['', Validators.required]
  });

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private Servi: AreaService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
      //ui-loader
      this.ngxService.start();
      setTimeout(() => {
        this.ngxService.stop();
      }, 100);
      this.get();
    }
  
    onSearch(){
      let search= this.iform.value
      console.log("search ", search.buscar)
      this.Servi.getForPage(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
        let insirance: IAreaModel = data;
        this.dataSource = insirance.result.list
      })
    }
  
    get() {
      let search= this.iform.value
      console.log("getInsirances ", search.buscar)
      this.Servi.getForPage(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
        let insirance: IAreaModel = data;
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
      this.getForPage(this.pageIndex, this.pageSize, '', this.todas);
    }
  
    getForPage(
      page: number,
      perPage: number,
      filter: string,
      todas: boolean
    ) {
      this.Servi.getForPage(page, perPage, filter, todas).subscribe(data => {
        let insirance: IAreaModel = data;
        this.dataSource = insirance.result.list
      })
    }
  
  
    onNew(){
      this.router.navigateByUrl(this.navigateAddUrl);
    }
  
  
    onSelectEdit(i: number) {
      this.Servi.refreshData(i);
      this.router.navigateByUrl(this.navigateEditUrl);
    }
  
    onSelectDelete(event: any) {
      //console.log("onSelectDelete ", event);
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
  
          this.Servi.delete(event).subscribe(data => {
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
                  this.get();
                  break;
                default:
                  this.snackbar.open(insirance.message, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                    panelClass: ['alert-snackbar']
                  });
                  this.get();
                  break;
              }
            }
            this.dataSource = insirance.result.list
          })
        }
        else {
          this.get();
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
      this.Servi.refreshData(event);
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
          this.Servi.disable(id,action).subscribe(data=>{
            let specialite=data;
            //console.log("activa o desactiva ", id,action);
  
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
                  this.get();
                  break;
  
                default:
                  this.snackbar.open(specialite.message, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                    panelClass: ['alert-snackbar']
                  });
                  this.get();
                  break;
              }
            }
            this.dataSource = specialite.result.list
          })
        }
        else {
          this.get();
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
  
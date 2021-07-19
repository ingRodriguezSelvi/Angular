import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IspecialtiesModel, resultEspecialides } from 'src/app/models/interfaceAdmin';
import { ApiservicesService } from '../../services/apiservices.service';
import { SpecialtiesService } from '../../services/specialties.service';

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
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-list-specialties',
  templateUrl: './list-specialties.component.html',
  styleUrls: ['./list-specialties.component.scss']
})
export class ListSpecialtiesComponent  {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   // MatPaginator Inputs
   length = 100;
   pageSize = 10;
   pageIndex=1;
   pageSizeOptions: number[] = [5, 10, 25, 50, 100];

   status=true;

  displayedColumns = ['id', 'name','status','acciones'];
  dataSource:any;

  //disable:'disabled';


  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private srv:ApiservicesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ) {
  }

  searchEsp=this.fb.group({
    name:[''],
    status:[true]
  })


  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    this.getSpecialidades();
  }


  getSpecialidades(){
    this.srv.getespecialides(this.pageIndex,this.pageSize,'',this.status).subscribe(data=>{
      this.pageIndex =data.result.page;
      this.length=data.result.totalItems;
      let especialiades:IspecialtiesModel=data;
      this.dataSource=especialiades.result.list
   })
  }

  SearchEsp(){

  }
  editEspecialidad(){

  }
  onchange(event:any,id:any){
    console.log("onchange check ",event.checked,id)
    this.srv.refreshData(event);
    let dialogRef:any;
    let action:number=0;
    if (event.checked){
      action=1;
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
    action=0;
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
  console.log("pasa activa o desactiva " );
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.srv.disablespecialties(id,event.checked).subscribe(data=>{
          let specialite=data;
          console.log("activa o desactiva ", id,event.checked);

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
                this.getSpecialidades();
                break;

              default:
                this.snackbar.open(specialite.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['alert-snackbar']
                });
                this.getSpecialidades();
                break;
            }
          }
          this.dataSource = specialite.result.list
        })
      }
      else {
        this.getSpecialidades();
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['idb-snackbar']
        });
      }
    });

  }


  onChangePage(event:any) {
    if (event.pageIndex==0){
      this.pageIndex=1
    }else{
      this.pageIndex=event.pageIndex;
    }
    this.pageSize=event.pageSize;
    this.length=event.length;
    this.getSpecialidadesPage(this.pageIndex,this.pageSize,'',this.status);
  }

  getSpecialidadesPage(
    page:number,
    perPage:number,
    filter:string,
    todas: boolean
    ){
    this.srv.getespecialides(page,perPage,filter,todas).subscribe(data=>{
      let especialiades:IspecialtiesModel=data;
      this.dataSource=especialiades.result.list
   })
  }

  onSelectEdit(i:number){
    //console.log("onSelectEdit ",i);
    this.srv.refreshData(i);
    this.router.navigateByUrl("formeditspecialties");
  }

  onSelectDelete(event:any){
    console.log("onSelectDelete " ,event);
    this.srv.refreshData(event);
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
        this.srv.deletespecialties(event).subscribe(data=>{
          let specialite=data;
          console.log("elimina ", specialite);

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
                  this.snackbar.open('Se a eliminado con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['success-snackbar']
                });
                this.getSpecialidades();
                break;

              default:
                this.snackbar.open(specialite.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['alert-snackbar']
                });
                this.getSpecialidades();
                break;
            }
          }
          this.dataSource = specialite.result.list
        })

        // this.snackbar.open('Se a eliminado el paciente con exito ', '', {
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        //   duration: 3000,
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

  onNew(){
    this.router.navigateByUrl("formspecialties");
  }


}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormAssignPasswordModalComponent } from 'src/app/feature/auth/components/form-assign-password-modal/form-assign-password-modal.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IusersModel } from 'src/app/models';
import { UsersService } from '../../services/users.service';
import { FormUsersAssignPasswordComponent } from '../form-users-assign-password/form-users-assign-password.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  title='usuario';
  navigateListUrl='users';
  navigateAddUrl='formusers';
  navigateEditUrl='foreditusers';
  icoselect ='done';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedIndex: number = 0
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = true;

  dataSource!:any;
  displayedColumns = ['rif','nombres', 'apellidos', 'email','telefonos','status','id'];

  iForm = this.fb.group({
    buscar: ['']
  })
  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private uservice:UsersService,

  ) { }

  ngOnInit(): void {
     this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    this.onSearch();
  }

  onNew(){
    this.router.navigateByUrl(this.navigateAddUrl);
  }
  onCancel() {
    this.router.navigateByUrl(this.navigateListUrl);
  }
  onSearch(){
    let search= this.iForm.value
    console.log("search ", search.buscar)
    this.uservice.getForPage(this.pageIndex, this.pageSize, search.buscar, this.todas).subscribe(data => {
      let user: IusersModel = data;
      this.dataSource = user.result.list
    })
  }

  onChangePage(event: any) {
    if (event.pageIndex == 0) {
      this.pageIndex = 1
    } else {
      this.pageIndex = event.pageIndex;
    }
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.uservice.getForPage(this.pageIndex, this.pageSize, '', this.todas).subscribe(data => {
      let insirance: IusersModel = data;
      this.dataSource = insirance.result.list
    })
  }

  onSelectCheck(event: any){

  }

  onSelectEdit(i: number) {
    this.uservice.refreshData(i);
    this.router.navigateByUrl(this.navigateEditUrl);
  }

  onSelectDelete(event: any) {
    this.uservice.refreshData(event);

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

        this.uservice.delete(event).subscribe(data => {
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
                  this.snackbar.open('Se a eliminado con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['success-snackbar']
                });
                this.onSearch();
                break;
              default:
                this.snackbar.open(insirance.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['alert-snackbar']
                });
                this.onSearch();
                break;
            }
          }
          this.dataSource = insirance.result.list
        })
      }
      else {
        this.onSearch();
        this.snackbar.open('Cancelo la eliminacion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['idb-snackbar']
        });
      }
    });
  }

  onAssignPassword(id:number){
    this.uservice.refreshData(id);
    const dialogConfig= new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
       
        const dialogRef = this.dialog.open(FormAssignPasswordModalComponent,dialogConfig);
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed){
            console.log("confirmed ",confirmed)
          }
        });
  }
 
  onDesable(event:any,id:any){
    console.log("onDesable check ",event.checked,id)
    this.uservice.refreshData(event);
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
        this.uservice.disable(id,action).subscribe(data=>{
          let specialite=data;
          console.log("activa o desactiva ", id,event.checked);

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
                this.onChangePage(specialite.statusCode );
                break;

              default:
                this.snackbar.open(specialite.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: ['alert-snackbar']
                });
                this.onChangePage(specialite.statusCode );
                break;
            }
          }
          this.dataSource = specialite.result.list
        })
      }
      else {
        this.onChangePage(confirmed );
        this.snackbar.open('Cancelo la accion', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['idb-snackbar']
        });
      }
    });

  }


}

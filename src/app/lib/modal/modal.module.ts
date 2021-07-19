import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
//import {}



@NgModule({
  declarations: [
    ConfirmationDialog,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ConfirmationDialog, AlertDialogComponent],
})
export class ModalModule { }

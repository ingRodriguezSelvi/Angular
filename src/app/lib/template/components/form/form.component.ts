import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InsiranceService } from 'src/app/feature/admin/insurance/services/insirance.service';
import { PatientService } from 'src/app/feature/patient/services/patient.service';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { _Iinsirance, IinsiranceModel } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  title='Seguro';
  Urlnavform='';
  Urlnavformedit='';
  Urlnavlist='';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  tlfmask= [/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myModel: any;
  tlfModel:any;
  tlfContactModel:any;
  dateofBirth = new Date();
  //form name
  iForm = this.fb.group({
    tname: ['', Validators.required],
    type: ['', Validators.required],
    name: ['', Validators.required],
    tiporif: ['', Validators.required],
    rif: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)],
    ],

    tlf: ['', [Validators.required, Validators.minLength(7),]],
    amail: ['', [Validators.required, Validators.email]],
    address: [''],

    namecontact: [''],
    lastnameconact: [''],
    mailcontact: ['', [Validators.email]],
    tlfcontact: [''],


    trif: [null],
  });

  tiporif = [
    { type: 'V', name: 'V' },
    { type: 'E', name: 'E' },
    { type: 'J', name: 'J' },
    { type: 'P', name: 'P' },
    { type: 'G', name: 'G' }
  ];
  typeinst = [
    { type: 'Pub', name: 'Publica' },
    { type: 'Pri', name: 'Privada' },
  ];
  typeins = [
    { type: 'S', name: 'Seguro' },
    { type: 'E', name: 'Empresa' },
  ];

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,  
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //services name
    private servi: InsiranceService,
  ) { }

  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100); 
  }

  onSubmit(){
    let patient: Partial<_Iinsirance> = this.getFormData();
    let patients: IinsiranceModel
    if(this.iForm.valid){
      //add
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
            try{
              this.servi.addInsirance(patient).subscribe((data) => {
                patients = data;
  
                  this.snackbar.open(patients.message, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 5000,
                    panelClass: [!patients.succeeded ? 'danger-snackbar' : 'success-snackbar'],
                  });
                  if (patients.succeeded) {
                    this.router.navigateByUrl('insurance');
                }
              });
  
            }
            catch (err){
                console.log("error",err.message)
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
      else
      {
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
      }

  }
  onCancel(){
    this.router.navigateByUrl(this.Urlnavlist);
  }

  getFormData(): Partial<_Iinsirance> {
    let raw = this.iForm.value;
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
  
    let patient: Partial<_Iinsirance> = {
      razon_social: raw.name.toUpperCase().trim(),
      Rif: raw.lastname.toUpperCase().trim(),
      
    };
    return patient;
  }

  onChangeFocusOption(e:any,id:string){
    document.getElementById(id)?.focus();
  }

  onChangeFocus(e:any,id:string){
    if(e.key=="Enter"){
      document.getElementById(id)?.focus();
    }
  }

}

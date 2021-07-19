import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs/operators';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { AreaModel, IAreaModel, IcitiesModel, IcountryModel, IinsiranceModel, ImunicipalityModel, IstateModel } from 'src/app/models';
import { InsiranceService } from '../../../insurance/services/insirance.service';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss']
})
export class FormAreaComponent implements OnInit {
  title='area';
  navigateListUrl='area';
  navigateAddUrl='formarea';
  navigateEditUrl='foreditarea';
  icoselect ='done';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateofBirth = new Date();
  //nombre del formulario
  iForm = this.fb.group({
    name: ['', Validators.required],
  });

  country: any;
  state: any;
  cities: any;
  municipality: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    //nombre del servicio
    private Servi: AreaService,
  ) { }

  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }



  onCancel() {
    this.router.navigateByUrl(this.navigateListUrl);
  }
  onSubmit() {
    //let patient: Partial<AreaModel> = this.getFormData();
    let patient: Partial<AreaModel> = this.getFormData();
    let patients: IAreaModel
    //errorMessage
    console.log("Insirance ", patient);
    console.log("this.insiranceForm.valid ", this.iForm.valid)
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
            this.Servi.add(patient).subscribe((data) => {
              patients = data;

                this.snackbar.open(patients.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 5000,
                  panelClass: [!patients.succeeded ? 'danger-snackbar' : 'success-snackbar'],
                });
                if (patients.succeeded) {
                  this.router.navigateByUrl(this.navigateListUrl);
              }
            });

          }
          catch (err){
            //this.snackbar.open('Intente mas tarde ', '', {
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
          message: 'Complete los campos faltantes',
          buttonText: {
            cancel: 'Aceptar',
          },
        }
        const dialogRef = this.dialog.open(AlertDialogComponent,dialogConfig);
    }
  }

  getFormData(): Partial<AreaModel> {
    // this.dateofBirth = dateofBirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let raw = this.iForm.value;

    console.log("raw ", raw)
    
    let patient: Partial<AreaModel> = {
    nombre: raw.name.toUpperCase().trim(),
    status: "1",
    usuario_ins:"1", 
    fecha_ins:  this.dateofBirth,

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

import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs/operators';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IinsiranceModel, _Iinsirance } from 'src/app/models/insiranceModel';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import { IstateModel } from 'src/app/models/stateModel';
import { InsiranceService } from '../../services/insirance.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-form-insirance',
  templateUrl: './form-insirance.component.html',
  styleUrls: ['./form-insirance.component.scss']
})
export class FormInsiranceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateofBirth = new Date();
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  tlfmask= [/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myModel: any;
  tlfModel:any;
  tlfContactModel:any;
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

  //nombre del formulario
  insiranceForm = this.fb.group({
    tname: ['', Validators.required],
    type: ['', Validators.required],
    name: ['', Validators.required],
    tiporif: ['', Validators.required],
    rif: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)],
    this.validateRifNotTaken.bind(this)],
    // country: ['', Validators.required],
    // state: ['', Validators.required],
    // cities: ['', Validators.required],
    // municipality: ['', Validators.required],
    tlf: ['', [Validators.required, Validators.minLength(7),]],
    amail: ['', [Validators.required, Validators.email]],
    address: [''],

    namecontact: [''],
    lastnameconact: [''],
    mailcontact: ['', [Validators.email]],
    tlfcontact: [''],


    trif: [null],
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
    private insiranceServi: InsiranceService,
  ) { }

  ngOnInit(): void {
    //ui-loader
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    //this.onCountry();
  }

  onChangeCountry(event: any) {
    this.onState(event.value);
    this.onCities(event.value);
    this.onMunicipality(event.value);
  }
  onChangeState(event: any) {
    this.onCities(event.value);
    this.onMunicipality(event.value);
  }
  onCountry() {
    this.insiranceServi.getCountry().subscribe((data) => {
      let Country: IcountryModel = data;
      this.country = Country;
    });
  }
  onState(country: number) {
    this.insiranceServi.getState(country).subscribe((data) => {
      let state: IstateModel = data;
      this.state = state;
    });
  }
  onCities(state: number) {
    this.insiranceServi.getCities(state).subscribe((data) => {
      let cities: IcitiesModel = data;
      this.cities = cities;
    });
  }
  onMunicipality(state: number) {
    this.insiranceServi.getMunicipality(state).subscribe((data) => {
      let Municipality: ImunicipalityModel = data;
      this.municipality = Municipality;
    });
  }


  onCancel() {
    this.router.navigateByUrl('insurance');
  }
  onSubmit() {
    //let patient: Partial<_Iinsirance> = this.getFormData();
    let patient: Partial<_Iinsirance> = this.getFormData();
    let patients: IinsiranceModel
    //errorMessage
    console.log("Insirance ", patient);
    console.log("this.insiranceForm.valid ", this.insiranceForm.valid)
    if(this.insiranceForm.valid){
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
            this.insiranceServi.addInsirance(patient).subscribe((data) => {
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

  getFormData(): Partial<_Iinsirance> {
    let raw = this.insiranceForm.value;

    console.log("raw ", raw)
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let tlf=''
    let tlfcontacts=''

    tlf=raw.tlf.replace("-","").replace("-","");
    // if(raw.tlfcontact.length>0 ){
    //   tlfcontact=raw.tlfcontact
    // }
    tlfcontacts=raw.tlfcontact !
    if(tlfcontacts=== "undefined")
    {tlfcontacts=tlf}

    console.log("tlf ",tlf);
    console.log("tlfcontact ",tlfcontacts);


    let patient: Partial<_Iinsirance> = {
      Tipo_institucion: raw.tname,
      Tipo_seguro: raw.type,
      razon_social: raw.name.toUpperCase().trim(),
      Pre_rif: raw.tiporif,
      Rif: raw.rif.toString().trim(),
      // Pais: raw.country,
      // Estado: raw.state,
      // Ciudad: raw.cities,
      // Municipio: raw.municipality,
      Telefonos: tlf,
      Email: raw.amail,
      Direccion: raw.address.toUpperCase().trim(),
      Nombre_contacto: raw.namecontact.toUpperCase().trim(),
      Apellido_contacto: raw.lastnameconact.toUpperCase().trim(),
      Email_contacto: raw.mailcontact,
      Telefonos_contacto: tlfcontacts.toString(),
      Usuario_ins:1

    };
    return patient;
  }


  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.insiranceServi.getByRif(rifSearch).pipe(
      map((resp) => {
        return resp && resp.length > 0 ? { rifTaken: true } : null;
      })
    );
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

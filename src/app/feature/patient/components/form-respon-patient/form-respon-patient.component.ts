import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap, debounceTime, distinctUntilChanged, finalize, filter, take } from 'rxjs/operators';
import { IpatientModel, resultPatient, _Ipatient } from 'src/app/models/patientModel';
import { PatientService } from '../../services/patient.service';
import { DatePipe } from '@angular/common';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IstateModel } from 'src/app/models/stateModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IacademiclevelModel } from 'src/app/models/academiclevelModel';
import { IrelationshipModel } from 'src/app/models/relationshipModel';
import { IedocivilModel } from 'src/app/models/edocivilModel';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IinsiranceModel } from 'src/app/models/insiranceModel';
import { InsiranceService } from 'src/app/feature/admin/insurance/services/insirance.service';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-form-respon-patient',
  templateUrl: './form-respon-patient.component.html',
  styleUrls: ['./form-respon-patient.component.scss']
})
export class FormResponPatientComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateofBirth = new Date();
  isChecked = true;
  isResponsible: boolean = true;
  idResponsable: any;

  patientForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    tiporif: ['', Validators.required],
    cedula: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)],this.validateRifNotTaken.bind(this)],
    Placeofbirth: ['', Validators.required],
    Dateofbirth: [new Date(), Validators.required],
    age: [0, Validators.minLength(1)],
    sex: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    cities: ['', Validators.required],
    municipality: ['', Validators.required],
    residentialarea: ['', Validators.required],
    tlfhab: [''],
    tlfcel: ['', Validators.required],
    mail: ['', [Validators.required,Validators.email]],
    typeofpatient: ['', Validators.required],
    edocivil: [''],
    academiclevels: [''],
    profession: [''],
    occupation: [''],
    address: [''],
    namecontact: [''],
    lastnameconact: [''],
    tiporifcontact: [''],
    tlfcontact: [''],
    relationship: [null],
    addresscontact: [''],
    responsable: [this.isResponsible],

    trif: [null],

    repreName: [''],
    repreLastname: [''],
    repreTiporif: [''],
    repreCedula: [''],
    repreRelationship: [null],
  });

  hasUnitNumber = false;
  tiporif = [
    { type: 'V', name: 'V' },
    { type: 'E', name: 'E' },
    { type: 'J', name: 'J' },
    { type: 'P', name: 'P' },
    { type: 'G', name: 'G' },
    { type: 'M', name: 'M' },
  ];
  tiposex = [
    { type: 'M', name: 'Masculino' },
    { type: 'F', name: 'Femenino' },
  ];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = false;

  edocivil: any;
  Relationship: any;
  Academiclevels: any;
  country: any;
  state: any;
  cities: any;
  municipality: any;
  dataPatient: any;
  seguro:any;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private patientServi: PatientService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private seguros:InsiranceService,
  ) {}
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    this.onSeguros();
    this.onEdocivil();
    this.onRelationShip();
    this.onAcademiclevels();
    this.onCountry();
  }

  onChange(event: any) {
    let edad = ageCalculator(event.target.value);
    this.patientForm.controls.age.setValue(edad);
    //console.log("event edad ",event)
    if (edad < 18) {
      this.isChecked = false;
    } else {
      this.isChecked =true;
    }
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
  onSeguros(){
    this.seguros.getInsirance(1,1000,'',this.todas).subscribe((data) => {
      let seguross: IinsiranceModel = data;
      this.seguro = seguross.result.list;
    });
  }
  getFormData(): Partial<_Ipatient> {
    let raw = this.patientForm.value;
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let relationShip;
console.log("raw.relationship ",raw.relationship)
    relationShip = raw.relationship;
    let telf;
    if (raw.tlfhab.length > 0) {
      telf = raw.tlfcel.trim() + '/' + raw.tlfhab.trim();
    } else {
      telf = raw.tlfcel;
    }
    let responsa =0;
    if ((raw.responsable = true)) {
      responsa = 0;
      this.isResponsible = true;
    } else {
      this.idResponsable=null;
      responsa = this.idResponsable ;
      this.isResponsible = false;
    }
    let patient: Partial<_Ipatient> = {
      nombres: raw.name.toUpperCase().trim(),
      apellidos: raw.lastname.toUpperCase().trim(),
      full_name:
        raw.name.toUpperCase().trim() + ' ' + raw.lastname.toUpperCase().trim(),
      lugar_nacimiento: raw.Placeofbirth.toUpperCase().trim(),
      fecha_nacimiento: this.dateofBirth,
      sexo: raw.sex,
      direccion: raw.address.toUpperCase().trim(),
      pais: raw.country,
      estado: raw.state,
      ciudad: raw.cities,
      municipio: raw.municipality,
      zona: raw.residentialarea.toUpperCase().trim(),
      pre_cedula: raw.tiporif,
      cedula: raw.cedula,
      ocupacion: raw.occupation.trim(),
      telefonos: telf,
      email: raw.mail.trim(),
      educacion: raw.academiclevels,
      estado_civil: raw.edocivil,
      seguro: raw.typeofpatient,
      responsable: this.idResponsable,
      parentesco: raw.repreRelationship,
      nombre_emer: raw.namecontact.toUpperCase().trim(),
      apellidos_emer: raw.lastnameconact.toUpperCase().trim(),
      //pre_cedula_emer:raw.tiporifcontact,
      telefonos_emer: raw.tlfcontact,
      parentesco_emer: relationShip,
      direccion_emer: raw.addresscontact.toUpperCase().trim(),
      usuario_ins: 1,
      //typeofpatient:raw.typeofpatient,
    };
    return patient;
  }

  onCancel() {
    this.router.navigateByUrl('patient');
  }

  onSubmit() {
    let patient: Partial<_Ipatient> = this.getFormData();
    //console.log("patient ", patient);

    if (this.patientForm.valid)
    {
    //addpatient
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: '¿Estás seguro de que quieres guardar al paciente?',
        buttonText: {
          ok: 'Si',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.patientServi.addpatient(patient).subscribe((data) => {
          let patient: IpatientModel = data;
          console.log('agrega ', patient);

          if (patient.statusCode != 200) {
            this.snackbar.open(patient.message, '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['danger-snackbar'],
            });
          } else {
            switch (patient.succeeded) {
              case true:
                //this.snackbar.open(patient.message, '', {
                this.snackbar.open('Se a agregado el paciente con exito ', '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['success-snackbar'],
                });
                this.router.navigateByUrl('patient');
                break;

              default:
                this.snackbar.open(patient.message, '', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['alert-snackbar'],
                });
                this.router.navigateByUrl('patient');
                break;
            }
          }
        });
      } else {
        this.snackbar.open('Cancelo el agregar paciente', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['idb-snackbar'],
        });
      }
    });
    }
    else{
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          message: 'complete los campos',
          buttonText: {
            //ok: 'Si',
            cancel: 'Aceptar',
          },
        },
      });
    }
  }

  onEdocivil() {
    this.patientServi.getEdoCivil().subscribe((data) => {
      let edocivil: IedocivilModel = data;
      this.edocivil = edocivil;
    });
  }
  onRelationShip() {
    this.patientServi.getRelationShip().subscribe((data) => {
      let Relationship: IrelationshipModel = data;
      this.Relationship = Relationship;
    });
  }
  onAcademiclevels() {
    this.patientServi.getAcademiclevels().subscribe((data) => {
      let Academiclevels: IacademiclevelModel = data;
      this.Academiclevels = Academiclevels;
    });
  }
  onCountry() {
    this.patientServi.getCountry().subscribe((data) => {
      let Country: IcountryModel = data;
      this.country = Country;
    });
  }
  onState(country: number) {
    this.patientServi.getState(country).subscribe((data) => {
      let state: IstateModel = data;
      this.state = state;
    });
  }
  onCities(state: number) {
    this.patientServi.getCities(state).subscribe((data) => {
      let cities: IcitiesModel = data;
      this.cities = cities;
    });
  }
  onMunicipality(state: number) {
    this.patientServi.getMunicipality(state).subscribe((data) => {
      let Municipality: ImunicipalityModel = data;
      this.municipality = Municipality;
    });
  }

  responsableShow(isChecked: boolean) {
    //console.log("responsableShow ",isChecked);
    //let edad= ageCalculator(event.target.value);
    //this.isResponsible = !this.isResponsible;
  }
  onSearchRif() {
    this.patientServi
      .getpatient(1, 1, this.patientForm.controls.repreCedula.value, false)
      .subscribe((data) => {
        let patient: resultPatient = data.result;
        let total: IpatientModel = data;
        this.dataPatient = patient;
        if (total.result.totalItems > 0) {
          this.idResponsable = this.dataPatient.list[0].id;
          this.patientForm.controls.repreName.setValue(
            this.dataPatient.list[0].nombres
          );
          this.patientForm.controls.repreLastname.setValue(
            this.dataPatient.list[0].apellidos
          );
          this.patientForm.controls.repreTiporif.setValue(
            this.dataPatient.list[0].pre_cedula
          );
        } else {
          this.idResponsable = null;
          this.patientForm.controls.repreName.setValue('');
          this.patientForm.controls.repreLastname.setValue('');
          this.patientForm.controls.repreTiporif.setValue('');
          const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
              message:
                '¿Persona no registrada desaa registrarla para continuar?',
              buttonText: {
                ok: 'Si',
                cancel: 'No',
              },
            },
          });

          dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.width = '60%';
              this.dialog.open(FormResponPatientComponent, dialogConfig);
              dialogRef.afterClosed().subscribe((result) => {
                this.onSearchRif();
              });
            } else {
              this.idResponsable = null;
              this.patientForm.controls.repreCedula.setValue('');
              this.patientForm.controls.repreName.setValue('');
              this.patientForm.controls.repreLastname.setValue('');
              this.patientForm.controls.repreTiporif.setValue('');
            }
          });
        }
      });
  }

  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.patientServi.getPatientByRif(rifSearch).pipe(
      map((resp) => {
        return resp && resp.length > 0 ? { rifTaken: true } : null;
      })
    );
  }

  validateAgeTaken(control: AbstractControl) {
    let datebith = control.value;
    return ageCalculator(datebith);
  }
}

function ageCalculator(date: number): number {
  if (date) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    let showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return showAge;
  } else {
    return 0;
  }
}

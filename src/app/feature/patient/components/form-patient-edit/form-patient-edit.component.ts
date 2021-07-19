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
import { FormResponPatientComponent } from '../form-respon-patient/form-respon-patient.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IinsiranceModel } from 'src/app/models/insiranceModel';
import { InsiranceService } from 'src/app/feature/admin/insurance/services/insirance.service';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-form-patient-edit',
  templateUrl: './form-patient-edit.component.html',
  styleUrls: ['./form-patient-edit.component.scss']
})
export class FormPatientEditComponent implements OnInit {
  required = true;
  hasError = false;
  error = 'The input has an error!';
  idResponsable: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  patientForm!: FormGroup;
  dataView: any;
  dataPatient: any;
  dataRepon: any;
  dataUser: any;
  dateofBirth = new Date();
  isChecked = true;
  isResponsible: boolean = true;
  hasUnitNumber = false;
  tiporif = [
    { type: 'V', name: 'V' },
    { type: 'E', name: 'E' },
    { type: 'J', name: 'J' },
    { type: 'P', name: 'P' },
    { type: 'G', name: 'G' },
    { type: 'M', name: 'M' }
  ]
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
  seguro: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private patientServi: PatientService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private seguros: InsiranceService,
  ) { }

  ngOnInit() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);


    this.dataView = this.patientServi.refresh.asObservable();
    // console.log("this.dataUser ",this.dataView);
    this.dataView.subscribe((res: any) => {
      this.dataUser = res;

      //this.status = this.dataUser === null ? false : true;
      //this.initFormMode();
      //console.log("this.dataUser ",this.dataUser);
      if (this.dataUser == null) {
        this.router.navigateByUrl("patient");
      }
      else {
        //console.log("cargando hacia initFormMode",);
        //  this.patientServi.getpatients(this.dataUser).subscribe(data=>{
        //     let patient:IpatientModel=data;
        //     this.dataPatient=patient.result.list});
        //   console.log("this.dataPatient ",this.dataPatient)
        //        this.initFormMode();
        this.initFormMode();

      }
    });
  }

  onSeguros() {
    this.seguros.getInsirance(1, 1000, '', this.todas).subscribe((data) => {
      let seguross: IinsiranceModel = data;
      this.seguro = seguross.result.list;
    });
  }
  initFormMode() {

    this.patientServi.getpatients(this.dataUser).subscribe(data => {
      let patient: resultPatient = data.result;
      this.dataPatient = patient
      let telefonos = this.dataPatient.telefonos.toString().split('/');
      let telecel = '';
      let telehab = '';
      let nro_historia = '';
      let responsable = null;
      let repreName = '';
      let repreLastname = '';
      let repreTiporif = '';
      let repreCedula = '';


      if (telefonos.length > 1) {
        telecel = telefonos[0];
        telehab = telefonos[1];
      }
      else {
        telecel = telefonos[0];
      }
      if (this.dataPatient.nro_historia == null) {
        nro_historia = "0"
      }
      else { nro_historia = this.dataPatient.nro_historia; }
      if (this.dataPatient.responsable == null) {
        responsable = null;
      }
      else {
        responsable = this.dataPatient.responsable;
        this.isChecked = false;

        //find the person responsible and fill in the missing fields
        this.patientServi.getpatients(responsable).subscribe(data => {
          let resultPatient: resultPatient = data.result;
          this.dataRepon = resultPatient;
          repreName = this.dataRepon.nombres;
          repreLastname = this.dataRepon.apellidos;
          repreTiporif = this.dataRepon.pre_cedula;
          repreCedula = this.dataRepon.cedula;
          this.patientForm.controls.repreName.setValue(repreName)
          this.patientForm.controls.repreLastname.setValue(repreLastname)
          this.patientForm.controls.repreTiporif.setValue(repreTiporif)
          this.patientForm.controls.repreCedula.setValue(repreCedula)
        })
      }
      this.onSeguros();
      this.onEdocivil();
      this.onRelationShip();
      this.onAcademiclevels();
      this.onCountry();
      this.onState(this.dataPatient.pais);
      this.onCities(this.dataPatient.estado);
      this.onMunicipality(this.dataPatient.estado);

      this.patientForm = this.fb.group({
        id: [this.dataPatient ? this.dataPatient.id : ''],
        no_history: [this.dataPatient ? this.dataPatient.nro_historia : 0],
        name: [this.dataPatient ? this.dataPatient.nombres : '', [Validators.required]],
        lastname: [this.dataPatient ? this.dataPatient.apellidos : '', [Validators.required]],
        tiporif: [this.dataPatient ? this.dataPatient.pre_cedula : '', [Validators.required]],
        cedula: [this.dataPatient ? this.dataPatient.cedula : '', Validators.compose([
          Validators.required, Validators.minLength(6),
          Validators.maxLength(10)])
          //,this.validateRifNotTaken.bind(this)
        ],
        Placeofbirth: [this.dataPatient ? this.dataPatient.lugar_nacimiento : '', [Validators.required]],
        Dateofbirth: [this.dataPatient ? this.dataPatient.fecha_nacimiento : new Date(), [Validators.required]],
        age: [this.dataPatient ? ageCalculator(this.dataPatient.fecha_nacimiento) : 0, [Validators.required, Validators.minLength(1)]],
        sex: [this.dataPatient ? this.dataPatient.sexo : '', [Validators.required]],
        country: [this.dataPatient ? this.dataPatient.pais : '', [Validators.required]],
        state: [this.dataPatient ? this.dataPatient.estado : '', [Validators.required]],
        cities: [this.dataPatient ? this.dataPatient.ciudad : '', [Validators.required]],
        municipality: [this.dataPatient ? this.dataPatient.municipio : '', [Validators.required]],
        residentialarea: [this.dataPatient ? this.dataPatient.zona : '', Validators.required],
        tlfhab: [this.dataPatient ? telehab : ''],
        tlfcel: [this.dataPatient ? telecel : '', Validators.required],
        mail: [this.dataPatient ? this.dataPatient.email : '', Validators.email],
        typeofpatient: [this.dataPatient ? this.dataPatient.seguro : '', [Validators.required]],

        edocivil: [this.dataPatient ? this.dataPatient.estado_civil : ''],
        academiclevels: [this.dataPatient ? this.dataPatient.educacion : ''],
        profession: [this.dataPatient ? this.dataPatient.profession : ''],
        occupation: [this.dataPatient ? this.dataPatient.ocupacion : ''],
        address: [this.dataPatient ? this.dataPatient.direccion : ''],
        namecontact: [this.dataPatient ? this.dataPatient.nombre_emer : ''],
        lastnameconact: [this.dataPatient ? this.dataPatient.apellidos_emer : ''],
        //ojo pedir este campo
        tiporifcontact: [this.dataPatient ? 0 : "V",],
        tlfcontact: [this.dataPatient ? this.dataPatient.telefonos_emer : ''],
        relationship: [this.dataPatient ? this.dataPatient.parentesco_emer : null],
        addresscontact: [this.dataPatient ? this.dataPatient.direccion_emer : ''],
        responsable: [this.dataPatient ? responsable : null],

        trif: [null],

        repreName: [repreName, ''],
        repreLastname: [repreLastname, ''],
        repreTiporif: [this.dataPatient ? repreTiporif : ''],
        repreCedula: [this.dataPatient ? repreCedula : '', Validators.compose([
          Validators.minLength(6), Validators.maxLength(10)])
          //,this.validateRifNotTaken.bind(this)
        ],
        repreRelationship: [this.dataPatient ? this.dataPatient.parentesco : ''],
      });




    });
  }

  getFormData(): Partial<_Ipatient> {
    let raw = this.patientForm.value;
    this.dateofBirth = raw.Dateofbirth
    let DateofbirthFormat = this.datepipe.transform(this.dateofBirth, 'yyyy-MM-dd');
    let relationShip
    let repreRelationship

    relationShip = raw.relationship;
    repreRelationship = raw.repreRelationship;
    let telf
    if (raw.tlfhab.length > 0) {
      telf = raw.tlfcel + "/" + raw.tlfhab
    } else {
      telf = raw.tlfcel
    }

    let responsa = null;
    if (raw.responsable = true) {
      responsa = null;
      this.isResponsible = true;
    }
    else {
      responsa = raw.id;
      this.isResponsible = false;
    }

    let patient: Partial<_Ipatient> = {
      id: raw.id,
      nro_historia: raw.no_history,
      nombres: raw.name.toUpperCase(),
      apellidos: raw.lastname.toUpperCase(),
      full_name: raw.name.toUpperCase() + ' ' + raw.lastname.toUpperCase(),
      lugar_nacimiento: raw.Placeofbirth.toUpperCase(),
      fecha_nacimiento: this.dateofBirth,
      sexo: raw.sex,
      direccion: raw.address.toUpperCase(),
      pais: raw.country,
      estado: raw.state,
      ciudad: raw.cities,
      municipio: raw.municipality,
      zona: raw.residentialarea.toUpperCase(),
      pre_cedula: raw.tiporif,
      cedula: raw.cedula,
      //profession: raw.profession,
      ocupacion: raw.occupation,
      telefonos: telf,
      email: raw.mail,
      educacion: raw.academiclevels,
      estado_civil: raw.edocivil,
      seguro: raw.typeofpatient,
      responsable: this.idResponsable,
      parentesco: repreRelationship,
      nombre_emer: raw.namecontact.toUpperCase(),
      apellidos_emer: raw.lastnameconact.toUpperCase(),
      //pre_rif_emer: raw.tiporifcontact,
      telefonos_emer: raw.tlfcontact,// raw.cedulacontact,
      parentesco_emer: relationShip,
      direccion_emer: raw.addresscontact.toUpperCase(),
      usuario_ins: 1
    }

    return patient;
  }

  onCancel() {
    this.router.navigateByUrl("patient");
  }


  onSubmit() {
    let patient: Partial<_Ipatient> = this.getFormData();
    if (this.patientForm.valid) {
      this.patientServi.updatepatient(patient).subscribe(data => {
        let patient: IpatientModel = data;
        if (patient.statusCode != 200) {
          // console.log(
          //   "Message: " + patient.message + " statusCode " + patient.statusCode
          // )
          this.snackbar.open(patient.message, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['danger-snackbar']
          });
        } else {
          switch (patient.succeeded) {
            case true:
              this.snackbar.open('Se ha actualizado correctamente al paciente', '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['success-snackbar']
              });
              this.router.navigateByUrl("patient");
              break;
            default:
              this.snackbar.open(patient.message, '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['alert-snackbar']
              });
              this.router.navigateByUrl("patient");
              break;
          }
        }
      });
    } else {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          message: 'complete los campos',
          buttonText: {
            cancel: 'Aceptar',
          },
        },
      });
    }

  }

  onChange(event: any) {
    let edad = ageCalculator(event.target.value);
    this.patientForm.controls.age.setValue(edad);
    if (edad < 18) {
      this.isChecked = !this.isChecked
    }
    else { this.isChecked = !this.isChecked }
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

  onEdocivil() {
    this.patientServi.getEdoCivil().subscribe(data => {
      let edocivil: IedocivilModel = data;
      this.edocivil = edocivil
    })
  }
  onRelationShip() {
    this.patientServi.getRelationShip().subscribe(data => {
      let Relationship: IrelationshipModel = data;
      this.Relationship = Relationship
    })
  }
  onAcademiclevels() {
    this.patientServi.getAcademiclevels().subscribe(data => {
      let Academiclevels: IacademiclevelModel = data;
      this.Academiclevels = Academiclevels
    })
  }
  onCountry() {
    this.patientServi.getCountry().subscribe(data => {
      let Country: IcountryModel = data;
      this.country = Country
    })
  }
  onState(country: number) {
    this.patientServi.getState(country).subscribe(data => {
      let state: IstateModel = data;
      this.state = state
    })
  }
  onCities(state: number) {
    this.patientServi.getCities(state).subscribe(data => {
      let cities: IcitiesModel = data;
      this.cities = cities
    })
  }
  onMunicipality(state: number) {
    this.patientServi.getMunicipality(state).subscribe(data => {
      let Municipality: ImunicipalityModel = data;
      this.municipality = Municipality
    })
  }

  responsableShow(isChecked: boolean) {
    // console.log("responsableShow ",isChecked);
    //let edad= ageCalculator(event.target.value);
    //this.isChecked = !this.isChecked;
  }


  validateRifNotTaken(control: AbstractControl) {
    let rifSearch = control.value;
    return this.patientServi.getPatientByRif(rifSearch)
      .pipe(
        map(resp => {
          return (resp && resp.length > 0) ? { rifTaken: true } : null;
        })
      )
  }

  validateAgeTaken(control: AbstractControl) {
    let datebith = control.value;
    return ageCalculator(datebith)
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
              this.idResponsable = 0;
              this.patientForm.controls.repreCedula.setValue('');
              this.patientForm.controls.repreName.setValue('');
              this.patientForm.controls.repreLastname.setValue('');
              this.patientForm.controls.repreTiporif.setValue('');
            }
          });
        }
      });
  }

}

function ageCalculator(date: number): number {
  if (date) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    let showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return showAge;
  }
  else {
    return 0;
  }
}

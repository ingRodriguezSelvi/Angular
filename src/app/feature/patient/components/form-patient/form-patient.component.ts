import { DatePipe } from '@angular/common';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnyMxRecord } from 'dns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import {
  first,
  map,
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  finalize,
  filter,
  take,
  startWith,
} from 'rxjs/operators';
import { SearhComponent } from 'src/app/feature/admin/insurance/components/list-insurance/searh/searh.component';
import { InsiranceDataService } from 'src/app/feature/admin/insurance/services/insirance-data.service';
import { InsiranceService } from 'src/app/feature/admin/insurance/services/insirance.service';
import { ApiservicesService } from 'src/app/feature/admin/specialties/services/apiservices.service';
import { AlertDialogComponent } from 'src/app/lib/modal/components/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from 'src/app/lib/modal/components/confirmation-dialog/confirmation-dialog.component';
import { IacademiclevelModel } from 'src/app/models/academiclevelModel';
import { IcitiesModel } from 'src/app/models/citiesModel';
import { IcountryModel } from 'src/app/models/coutryModel';
import { IedocivilModel } from 'src/app/models/edocivilModel';
import { IinsiranceModel } from 'src/app/models/insiranceModel';
import { IspecialtiesModel } from 'src/app/models/interfaceAdmin';
import { ImunicipalityModel } from 'src/app/models/municipalityModel';
import {
  IpatientModel,
  resultPatient,
  _Ipatient,
} from 'src/app/models/patientModel';
import { IrelationshipModel } from 'src/app/models/relationshipModel';
import { IstateModel } from 'src/app/models/stateModel';
import { PatientService } from '../../services/patient.service';
import { FormResponPatientComponent } from '../form-respon-patient/form-respon-patient.component';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
//  providers:[InsiranceDataService]
})
export class FormPatientComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  dateofBirth = new Date();
  isChecked = true;
  isResponsible: boolean = true;
  idResponsable: any;
  dateModel: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  tlfmask= [/\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myModel: any;
  tlfModel:any;
  tlfhabModel:any;
  tlfconactModel:any

  tlfContactModel:any;

  events: string[] = [];

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  todas = false;
  fecha = new DatePipe('es-Ve');
  now = Date.now();

  patientForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    tiporif: ['', Validators.required],
    cedula: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)],this.validateRifNotTaken.bind(this)],
    Placeofbirth: ['', Validators.required],
    Dateofbirth: ['', Validators.required],
    age: [0, Validators.minLength(1)],
    sex: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    cities: ['', Validators.required],
    municipality: ['', Validators.required],
    residentialarea: ['', Validators.required],
    tlfhab: [''],
    tlfcel: ['', [Validators.required,Validators.minLength(13),
      Validators.pattern(new RegExp("[0-9]"))
    ]],
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

    typeofpatient0:['']
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

  edocivil: any;
  Relationship: any;
  Academiclevels: any;
  country: any;
  state: any;
  cities: any;
  municipality: any;
  dataPatient: any;
  seguro:any;

//seguro
  placeholder = "Select Seguro";
  clientsideFilter = false;
  removable = true;
  isOptionString = false;
  isChipAddFromInput = true;
  required = true;
  displayWith = "razon_social";
  itemid = "id";
  isOptionCheckable = false;
  disabledSelected = true;
  maxLanguage = 1;
  debounceTime = 500;
  filteredOptions$: any;
  service: any;

  seguroitemid:any;


  //busqueda autocomplete
  public keyword="name"
  data!: any []




  constructor(
    private ngxService: NgxUiLoaderService,
    protected router: Router,
    private fb: FormBuilder,
    private patientServi: PatientService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private seguros:InsiranceService,
    private host: ElementRef,
    //public adata:InsiranceDataService,

  ) {}
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
    //this.dataSvc.getInsirance().subscribe(cosole.log())
    this.onSeguros();
    this.onEdocivil();
    this.onRelationShip();
    this.onAcademiclevels();
    this.onCountry();
  }
  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

  onChange(event: any,id: string ) {
    console.log("event edad ",event)

    // if(event.key=="Enter"){
    //   let fecha=this.patientForm.controls.Dateofbirth.value.toString().length
    //   console.log("fecha ", fecha)
    //   if (fecha>=9)
    //   {
    //     this.patientServi
    //     console.log("fecha ", fecha)
    //   }

    //   //document.getElementById(id)?.focus();
    // }
    let edad = ageCalculator(event.target.value);
    this.patientForm.controls.age.setValue(edad);
    //console.log("event edad ",event)
    if (edad < 18) {
      this.isChecked = false;
    } else {
      this.isChecked =true;
    }
    if(event.key=="Enter"){document.getElementById(id)?.focus();}
    else{document.getElementById(id)?.focus();}
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log ("event.value ",event.value)
    this.events.push(`${type}: ${event.value}`);
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

  getFormData(): Partial<_Ipatient>|any {
    let raw = this.patientForm.value;
    this.dateofBirth = raw.Dateofbirth;
    let DateofbirthFormat = this.datepipe.transform(
      this.dateofBirth,
      'yyyy-MM-dd'
    );
    let relationShip;

    let cel= raw.tlfcel.replace("-","").replace("-","");
    let hab= raw.tlfhab //.replace("-","");
    let tlfconta= raw.tlfcontact
    console.log("hab  ",hab)
    if (typeof hab ==="undefined")
    {
      hab=""
    }
    else{
      hab= raw.tlfhab.replace("-","").replace("-","");;
    }
    if (typeof tlfconta ==="undefined")
    {
      tlfconta=""
    }
    else{
      tlfconta= raw.tlfcontact.replace("-","").replace("-","");;
    }

    if (cel.includes('_')){
      //console.log("entre cel");
     document.getElementById("tlfm")?.focus();
      return;
    }

    if (hab.includes('_')){
      //console.log("entre hab");
      document.getElementById("tlfh")?.focus();
      this.patientForm.invalid
      return;
    }


    if (tlfconta.includes('_')){
      //console.log("entre tlfconta");
      document.getElementById("tlcon")?.focus();
      this.patientForm.invalid
      return;
    }


    relationShip = raw.relationship;
    let telf;
    if (hab.length > 0) {
      telf = cel.trim() + '/' + hab.trim();
    } else {
      telf = cel;
    }
    if (typeof this.idResponsable==="undefined")
    {
      this.idResponsable=null;
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

    let education= raw.academiclevels
    if (raw.academiclevels.length==0)
    {
      education=null;
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
      cedula: raw.cedula.toString(),
      ocupacion: raw.occupation.trim(),
      telefonos: telf,
      email: raw.mail.trim(),
      educacion: education,
      estado_civil: raw.edocivil,
      seguro: this.seguroitemid,
      responsable: this.idResponsable,
      parentesco: raw.repreRelationship,
      nombre_emer: raw.namecontact.toUpperCase().trim(),
      apellidos_emer: raw.lastnameconact.toUpperCase().trim(),
      //pre_cedula_emer:raw.tiporifcontact,
      telefonos_emer: tlfconta,
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
    console.log("paciente ", patient)

    if (typeof patient === "undefined") {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          icon: 'warning',
          message: 'Complete los campos faltantes',
          buttonText: {
            cancel: 'Aceptar',
          },
        },
      });
    } else {

      //console.log("formulario valido ", this.patientForm.valid)

      //addpatient
      console.log("formulario valido ", this.patientForm.valid)
      if (this.patientForm.valid) {
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
            icon:'warning',
            message: 'Complete los campos faltantes',
            buttonText: {
              //ok: 'Si',
              cancel: 'Aceptar',
            },
          },
        });

      }
    }

  }
  onSeguros(){
    // this.seguros.getInsirance(1,1000,'',this.todas).subscribe((data) => {
    //   let seguross: IinsiranceModel = data;
    //   this.seguro = seguross.result.list;
    // });

    // this.seguro=[
    //   { id: "bn", razon_social: "Bangla" },
    // { id: "en", razon_social: "English" },
    // { id: "de", razon_social: "German" },
    // { id: "ctg", razon_social: "Chatgaiya"}
    // ]

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

  responsableShow(e:any){
    let id ="tercero"
    document.getElementById(id)?.focus();
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


  onChangeFocusOption(e:any,id:string){
    document.getElementById(id)?.focus();
  }

  onChangeFocus(e:any,id:string){
    if(e.key=="Enter"){
      document.getElementById(id)?.focus();
    }
  }

  onChangeSearchkey(event:any) {

  }

  onSearchSeguro(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      //dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(SearhComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        //console.log("result ", result)
        if(result==null){result=''}
        this.seguros.refreshData(result);
        this.seguroitemid=result;


        this.seguros.getInsirances(result).subscribe((data) => {
          let seguross: IinsiranceModel = data;
          this.seguro = seguross.result;
          //console.log("result ", data )

          this.patientForm.controls.typeofpatient.setValue(this.seguro.razon_social);
          //this.typeofpatient=this.seguro.razon_social
        });
    });
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
